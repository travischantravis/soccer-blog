const functions = require("firebase-functions");
const async = require("express-async-await");
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");

// Express
const app = express();
app.use(express.json());
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Firestore initialization
admin.initializeApp();
const db = admin.firestore();

// [Debug] Initial test
app.get("/test", (req, res) => {
  res.send("testing success!");
});

// [Debug] GET individual match from Firestore
app.get("/api/match/:matchId", (req, res) => {
  const { matchId } = req.params;
  db.collection("match")
    .doc(matchId)
    .get()
    .then((doc) => res.send(doc.data()))
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

// GET individual players with all their match comments
app.get("/api/player/detail/:uid", async (req, res) => {
  const { uid } = req.params;

  // 1. GET basic information
  try {
    const basicInfoRef = await db.collection("players").doc(uid).get();
    const basicInfo = basicInfoRef.data();

    // 2. GET all the player's comments
    const querySnapshots = await db
      .collectionGroup("chelsea_squad")
      .where("player_id", "==", uid)
      .get();

    const combinedCommentInfo = await Promise.all(
      querySnapshots.docs.map(async (d) => {
        let matchComment = d.data();

        // 3. GET corresponding match info
        const matchInfoRef = await db
          .collection("match")
          .doc(matchComment.match_id)
          .get();
        const matchInfo = matchInfoRef.data();

        // 4. Combine player comment with match info
        const matchAllInfo = Object.assign(matchComment, matchInfo);

        return matchAllInfo;
      })
    );

    // 5. Sort in descending date
    const _combinedCommentInfo = await combinedCommentInfo.sort((a, b) =>
      a.date._seconds < b.date._seconds ? 1 : -1
    );

    // 6. Combine all info
    let allInfo = {
      basic: basicInfo,
      comments: _combinedCommentInfo,
    };

    res.send(allInfo);
  } catch (err) {
    console.log("Error getting documents", err);
  }
});

// GET all matches
app.get("/api/matches/all", async (req, res) => {
  const snapshot = await db.collection("match").orderBy("date", "desc").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

// GET information of all players in an individual match
app.get("/api/match/:id/squad", async (req, res) => {
  const { id } = req.params;

  // 1. GET all players in an individual match
  const squadCommentRef = await db
    .collection("match/" + id + "/chelsea_squad")
    .get();
  const squadComment = squadCommentRef.docs.map((doc) => doc.data());

  // 2. GET basic information of the players presented in the match
  const playerCombinedInfo = await Promise.all(
    squadComment.map(async (d) => {
      const playerInfoRef = await db
        .collection("players/")
        .doc(d.player_id)
        .get();

      const playerInfo = playerInfoRef.data();

      // 3. Combine the two objects
      return Object.assign(d, playerInfo);
    })
  );

  // 4. Sort according to name
  res.send(playerCombinedInfo.sort((a, b) => (a.name > b.name ? 1 : -1)));
});

// GET all players
app.get("/api/players/all", async (req, res) => {
  const snapshot = await db.collection("players").orderBy("name").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

// Add player comments to a match
app.post("/api/match/:id/add", jsonParser, async (req, res) => {
  const matchId = req.params.id;
  console.log(req.body);
  console.log(req.body["rating"]);
  console.log(req.body.comment);
  const commentData = {
    rating: req.body.rating,
    player_id: req.body.player_id,
    comment: req.body.comment,
    match_id: matchId,
  };
  console.log(commentData);

  db.collection("match")
    .doc(matchId)
    .collection("chelsea_squad")
    .add(commentData)
    .then(() => res.send("success add"))
    .catch((err) => console.log("Cannot add comment", err));
});

exports.app = functions.https.onRequest(app);
// soccer-blog-723a1.firebaseapp.com

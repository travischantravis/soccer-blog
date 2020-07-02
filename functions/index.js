const functions = require("firebase-functions");
const async = require("express-async-await");
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");

// Express
const app = express();
app.use(express.json());

// Firestore initialization
admin.initializeApp();
const db = admin.firestore();

// [Debug] Initial test
app.get("/test", (req, res) => {
  res.send("testing success!");
});

// [Debug] GET individual matcg from Firestore
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

    // 5. Combine all info
    let allInfo = {
      basic: basicInfo,
      comments: combinedCommentInfo,
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
  const snapshot = await db.collection("players").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

exports.app = functions.https.onRequest(app);
// soccer-blog-723a1.firebaseapp.com

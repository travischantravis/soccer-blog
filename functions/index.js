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

// [Debug] GET individual players from Firestore
app.get("/api/player/:docId", (req, res) => {
  const { docId } = req.params;
  db.collection("players")
    .doc(docId)
    .get()
    .then((doc) => res.send(doc.data()))
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

// GET all matches
app.get("/api/matches/all", async (req, res) => {
  const snapshot = await db.collection("match").orderBy("date", "desc").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

// GET information of all players in an individual match
app.get("/api/match/:id/squad", async (req, res) => {
  const { id } = req.params;
  console.log(id);

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

  // Sort according to name
  res.send(playerCombinedInfo.sort((a, b) => (a.name > b.name ? 1 : -1)));
});

// GET all players
app.get("/api/players/all", async (req, res) => {
  const snapshot = await db.collection("players").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

exports.app = functions.https.onRequest(app);
// soccer-blog-723a1.firebaseapp.com

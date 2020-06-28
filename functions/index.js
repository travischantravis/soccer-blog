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

// [Debug] GET individual data from Firestore, passing @documentId
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

// GET all matches
app.get("/api/matches/all", async (req, res) => {
  const snapshot = await db.collection("match").get();
  res.send(snapshot.docs.map((doc) => doc.data()));
});

exports.app = functions.https.onRequest(app);

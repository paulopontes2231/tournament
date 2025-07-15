const express = require("express");
const router = express.Router();
const Match = require("../models/match");

router.get("/match", async (req: any, res: any) => {
    try {
    const matches = await Match.find({});
    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch matches: " + err.message});
  }
});

router.post("/match", async (req: any, res: any) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to create match: " + err.message });
  }
});

router.get("/match/:id", async (req: any, res: any) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.json(match);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch match: " + err.message });
  }
});


router.put("/match/:id", async (req: any, res: any) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) { 
      return res.status(404).json({ error: "Match not found" });
    } 
    res.json(match);
  } catch (err: any) {
    res.status(400).json({ error: "Failed to update match: " + err.message });
  } 
});


module.exports = router;

const express = require("express");
const router = express.Router();
const Match = require("../models/match");

router.get("/match", async (req: any, res: any) => {
  try {
    const matches = await Match.find({});
    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch matches: " + err.message });
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

router.post("/match/filter", async (req: any, res: any) => {
  const rawFilter = req.body; // e.g. { escalao, genero, nomeEquipa }

  // Step 1: clean null/undefined values
  const filter: any = {};
  if (rawFilter.escalao != null) filter.level = rawFilter.escalao;
  if (rawFilter.genero != null) filter.gender = rawFilter.genero;

  // Step 2: if nomeEquipa is provided, add the $or clause
  if (rawFilter.nomeEquipa != null) {
    filter.$or = [
      { teamA: rawFilter.nomeEquipa },
      { teamB: rawFilter.nomeEquipa  }
    ];
  }

  // Step 3: query with the cleaned filter
  try {
    const matches = await Match.find(filter).collation({ locale: 'en', strength: 2 });
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

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

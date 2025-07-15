const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    startTime: { type: String, required: true,  },
    round: { type: String, required: true,  },
    gameNumber: { type: String, required: true, unique: true },
    field: { type: String, required: true,  },
    score: { type: Array, required: true },
    status: { type: String, required: true },
    level: { type: String, required: true },
}, { collection: "Match" }, {database: "sample_mflix"});

module.exports = mongoose.model("Match", matchSchema);
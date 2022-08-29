const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  playerEmail: {
    type: String,
    required: true
  },
  correctWord: {
    type: String,
    required: true
  },
  lastGuess: String,
  attemptCount: {
    type: Number,
    default: 0,
    required: true,
  },
  won: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    default: "IN-PROGRESS",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});


module.exports = mongoose.model("Game", gameSchema);

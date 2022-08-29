const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  // user:{

  // },
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
  }
});

gameSchema.toJSON = function() {
  return {
    lastGuess:this.lastGuess,
    attemptCount: this.attemptCount,
    won:this.won,
    status:this.status
  }
}

module.exports = mongoose.model("Game", gameSchema);

const mongoose = require("mongoose");
const Game = require("../models/game.model");

const {getWordToGuess} = require("../utils")
exports.create = async () => {
  let wordToGuess = getWordToGuess();
  const game = new Game({
    correctWord: wordToGuess.toUpperCase(),
  });
  return await Game.create(game);
};

exports.findGameByPk = async (id) => {
  return await Game.findOne({ _id: id });
};

exports.findGameByStatus = async () => {
  return await Game.findOne({ status: "IN-PROGRESS" });
};

exports.update = async (game, updates) => {
  return await Game.findByIdAndUpdate(game._id, updates);
};

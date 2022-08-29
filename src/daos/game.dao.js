const mongoose = require("mongoose");
const Game = require("../models/game.model");

const {getWordToGuess} = require("../utils")
exports.create = async (playerName, playerEmail) => {
  let wordToGuess = getWordToGuess();
  const game = new Game({
    correctWord: wordToGuess.toUpperCase(),
    playerName: playerName,
    playerEmail: playerEmail
  });
  return await Game.create(game);
};

exports.findGameByPk = async (id) => {
  return await Game.findOne({ _id: id });
};

exports.findGameByStatus = async (playerName, playerEmail) => {

  const options = {
    playerName: playerName,
    playerEmail: playerEmail,
    status: "IN-PROGRESS"
  }
  return await Game.findOne(options);
};

exports.update = async (game, updates) => {
  return await Game.findByIdAndUpdate(game._id, updates);
};

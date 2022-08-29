const GameDAO = require("../daos/game.dao");
const randomWord = require("random-word-by-length");
const Game = require("../models/game.model");
const {colorMap} = require("../utils")

exports.guess = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GameDAO.findGameByPk(id);
    if (!game)
      return res.status(404).send({
        message: "No Game Found",
      });
    if (game.attemptCount >= 6)
      return res.status(400).send({
        message: "Game Ended",
      });
    if (game.won)
      return res.status(400).send({
        message: "Game Ended",
      });

    const { first, second, third, fourth, fivth } = req.body;

    const updates = {};
    updates.lastGuess = (first + second + third + fourth + fivth).toUpperCase();
    updates.attemptCount = game.attemptCount + 1;
    updates.won = game.correctWord == updates.lastGuess;
    updates.status = updates.won ? "COMPLETED" : updates.attemptCount == 6 ? "COMPLETED" : "IN-PROGRESS";

    await GameDAO.update(game._id, updates);

    if (updates.won) {
      res.render("games/won", { correctWord: game.correctWord });
      return;
    }
    if (updates.attemptCount === 6) {
      res.render("games/lost", { correctWord: game.correctWord });
      return;
    }
    updates.color0 = colorMap(game.correctWord, updates.lastGuess, 0);
    updates.color1 = colorMap(game.correctWord, updates.lastGuess, 1);
    updates.color2 = colorMap(game.correctWord, updates.lastGuess, 2);
    updates.color3 = colorMap(game.correctWord, updates.lastGuess, 3);
    updates.color4 = colorMap(game.correctWord, updates.lastGuess, 4);
    updates._id = game._id;
    res.render("games/playground", { game: updates });
  } catch (err) {
    res.render("error", {
      message: err || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.findInProgressGame = async (req, res) => {
  try {
    const game = await GameDAO.findGameByStatus();
    
    if (game) {
      if(game.lastGuess) {
        game.color0 = colorMap(game.correctWord, game.lastGuess, 0);
        game.color1 = colorMap(game.correctWord, game.lastGuess, 1);
        game.color2 = colorMap(game.correctWord, game.lastGuess, 2);
        game.color3 = colorMap(game.correctWord, game.lastGuess, 3);
        game.color4 = colorMap(game.correctWord, game.lastGuess, 4);
      }
      res.render("games/playground", { game: game });
    } else {
      const newGame = await GameDAO.create();
      if (newGame) {
        res.render("games/playground", { game: newGame });
      } else {
        res.render("error", { message: "Couldn't create a game for you!" });
      }
    }
  } catch (err) {
    res.render("error", {
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

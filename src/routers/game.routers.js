
module.exports = (app) => {
  const games = require("../controllers/game.controller");
  const router = require("express").Router();

  router.get("/", games.findInProgressGame)
  router.post("/:id", games.guess);

  app.use("/games", router);
};



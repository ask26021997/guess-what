
const Router = require("express").Router;
const router = Router();


const registerRoutes = app => {
  router.get("/", (req, res)=>{
    res.render("index");
  })
  app.use("/", router);
  const gameRouter = require("./game.routers")(app)
}

module.exports=registerRoutes;

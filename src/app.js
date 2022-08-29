const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
if(morgan) app.use(morgan('tiny'));

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.GUESST_IT_PORT || 5000;

const mongoose = require("mongoose");

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Connected to mongoDB");
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

require("./routers")(app);


app.listen(PORT, ()=>{
  console.log(`Guess IT game server running at: http://localhost:${PORT}`)
})


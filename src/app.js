const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const app = express();
if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan('tiny'));
}

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("src/public"));
app.use(bodyParser.urlencoded({ extended: false }));

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});


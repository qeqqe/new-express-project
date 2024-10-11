if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const port = 3000;

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log(`connected to mongoose`);
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT || port, () => {
  console.log(`litening at http://localhost:${port}`);
});

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
require("dotenv").config({
  path: "./config/index.env",
});

//Mongodb
const connectDB = require("./config/db");
connectDB();

app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/user/", require("./routes/auth.route"));
app.get("/", (req, res) => {
  res.send("test route => home");
});

//page not found
app.use((req, res) => {
  res.status(404).json({
    msg: "Page not founded",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App listing on port ");
});

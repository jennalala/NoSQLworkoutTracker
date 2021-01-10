const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
// const Workout = require("./models/workout");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

require("./routes/apiRoute")(app);
require("./routes/index")(app);

// routes


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

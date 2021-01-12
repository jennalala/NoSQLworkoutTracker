const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoute = require("./routes/apiRoute");
const htmlRoute = require("./routes/htmlRoute");

const PORT= process.env.PORT || 8080;

const app = express();

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//public directory
app.use(express.static("public"));

app.use(apiRoute);
app.use(htmlRoute);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true 
}
);

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
  });
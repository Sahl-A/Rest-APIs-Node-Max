const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();
///// Parse the body //////
////////////////////////////
// When we get data from <form>. It uses x-www-form-urlencoded format
// app.use(bodyParser.urlencoded())  // x-www-form-urlencoded  <form>

// When we get data as json. It uses application/json format
app.use(bodyParser.json()); // application/json

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "images")));

// By default, all the clients are restricted to access the server/REST api endpoints
// This is because of CORS, we solve this by allowing using headers in the response
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // We could specify certain websites, however, * for all
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Autorization");
  next();
});

///// Routes /////
//////////////////
app.use("/feed", feedRoutes);

// Error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message,
  });
});

///// Add Mongoose /////
////////////////////////
mongoose
  .connect("mongodb://localhost:27017/messages", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

///// Parse the body //////

// When we get data from <form>. It uses x-www-form-urlencoded format
// app.use(bodyParser.urlencoded())  // x-www-form-urlencoded  <form>

// When we get data as json. It uses application/json format
app.use(bodyParser.json()); // application/json

// By default, all the clients are restricted to access the server/REST api endpoints
// This is because of CORS, we solve this by allowing using headers in the response
app.use((res, req, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // We could specify certain websites, however, * for all
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Autorization");
});

///// Routes /////
app.use("/feed", feedRoutes);

app.listen(8080);

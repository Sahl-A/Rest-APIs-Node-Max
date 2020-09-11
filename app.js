const express = require("express");
const bodyParser = require('body-parser')

const feedRoutes = require("./routes/feed");

const app = express();

///// Parse the body //////

// When we get data from <form>. It uses x-www-form-urlencoded format
// app.use(bodyParser.urlencoded())  // x-www-form-urlencoded  <form>

// When we get data as json. It uses application/json format
app.use(bodyParser.json())      // application/json

///// Routes /////
app.use("/feed", feedRoutes);

app.listen(8080);

const express = require("express");

const feedRoutes = require("./routes/feed");

const app = express();

// Routes
app.use("/feed", feedRoutes);

app.listen(8080);

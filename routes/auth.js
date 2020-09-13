const express = require("express");

const authControllers = require("../controllers/auth");

const router = express.Router();

// POST /signup
router.put("/signup", authControllers.signup);

module.exports = router;

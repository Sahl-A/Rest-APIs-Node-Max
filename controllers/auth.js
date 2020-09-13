// Hash the password
const bcrypt = require("bcrypt");
// Get the validation result
const { validationResult } = require("express-validator");

const User = require("../models/user");

// When clicking on signup button
exports.signup = async (req, res, next) => {
  // Check the validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed: ${errors.array().msg}`);
    error.statusCode = 422;
    return next(error);
  }

  // Get the data from body
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
};

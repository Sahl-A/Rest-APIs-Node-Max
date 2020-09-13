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
    const error = new Error(`Validation failed: ${errors.array()}`);
    error.statusCode = 422;
    return next(error);
  }

  // Get the data from body
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  try {
    // Encrypt the password
    const hash = await bcrypt.hash(password, 12);
    try {
      const newUser = new User({
        email,
        password: hash,
        name,
      });
      const user = await newUser.save();
      res.status(201).json({ message: "User Created", userId: user._id });
    } catch (err) {
      // ERR when Saving the user to DB
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  } catch (err) {
    // ERR when encrypting the password
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

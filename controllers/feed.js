// Get the validation result
const { validationResult } = require("express-validator");
// Get the DB post model
const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    // Get the posts from the DB
    const posts = await Post.find();
    // Send the posts to the front-end
    res.status(200).json({
      posts
    });
  } catch (err) {
    // ERR when getting the posts from DB
    console.log(err);
  }
  
};

exports.createPost = async (req, res, next) => {
  // Get the data from the body
  const title = req.body.title;
  const content = req.body.content;

  // Return Error if the validation result has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, incorrect input",
      errors: errors.array(),
    });
  }

  // Add the data to the DB
  const newPost = new Post({
    title,
    content,
    imageUrl: "images/Mongo.jpg",
    creator: {
      name: "Sahl",
    },
  });
  try {
    const post = await newPost.save();
    // Send the response
    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (err) {
    // ERR when saving the new post to DB
    console.log(err);
  }
};

// Get the validation result
const { validationResult } = require("express-validator");
// Get the DB post model
const Post = require("../models/post");

// When using GET /feed/posts
exports.getPosts = async (req, res, next) => {
  try {
    // Get the posts from the DB
    const posts = await Post.find();
    // Send the posts to the front-end
    res.status(200).json({
      posts,
    });
  } catch (err) {
    // ERR when getting the posts from DB
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// When using POST /feed/post
exports.createPost = async (req, res, next) => {
  // Get the data from the body
  const title = req.body.title;
  const content = req.body.content;

  // Return Error if the validation result has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, incorrect input");
    error.statusCode = 422;
    next(error);
  }

  // Return Error if the file is not found
  if(!req.file) {
    const error = new Error('No image Provided')
    error.statusCode = 422;
    next(error);
  }
  const imageUrl = req.file.path;

  // Add the data to the DB
  const newPost = new Post({
    title,
    content,
    imageUrl: imageUrl,
    creator: {
      name: "Sahl",
    },
  });
  try {
    const post = await newPost.save();
    // Send the response
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    // ERR when saving the new post to DB
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// When using GET /feed/posts/:postId
exports.getOnePost = async (req, res, next) => {
  const postId = req.params.postId;
  // Get the post from the DB
  try {
    const post = await Post.findById(postId);
    // If the post is not found in DB
    if (!post) {
      const error = new Error("No single product is found with this ID");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Post Fetched", post });
  } catch (err) {
    // ERR when getting a post from DB
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get the validation result
const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: new Date().toDateString(),
        title: "First post",
        content: "This is the content of the first post",
        creator: {
          name: "sahl",
        },
        imageUrl: "images/Mongo.jpg",
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  // Return Error if the validation result has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: "Validation failed, incorrect input",
        errors: errors.array(),
      });
  }

  res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "sahl",
      },
      createdAt: new Date(),
    },
  });
};

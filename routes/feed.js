const express = require("express");

const feedController = require("../controllers/feed");

// To validate the routes
const { body } = require("express-validator");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);
// POST /feed/posts
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);
// GET /feed/posts/t345zj#342
router.get('/posts/:postId', feedController.getOnePost)
module.exports = router;

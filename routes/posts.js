const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const Post = require("../models/Post");



router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postId", async (req, res) => {
  console.log(req.params.postId);
  try {
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const posts = await Post.deleteOne({ _id: req.params.postId });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET  all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST =>Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = new Post({
      title,
      content,
      imageUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(400).json({ error: "Failed to create post" });
  }
});

module.exports = router;

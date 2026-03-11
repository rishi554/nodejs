const { Router } = require("express");
const Comment = require("../models/comment");
const Blog = require("../models/blog");

const router = Router();

router.post("/", async (req, res) => {
  const { content, blogId } = req.body;
  const blog = await Blog.findById(blogId).populate("createdBy");

  await Comment.create({
    content: content,
    userId: req.user._id,
    blogId: blogId,
  });

  res.redirect(`/blog/${blogId}`);
});

module.exports = router;

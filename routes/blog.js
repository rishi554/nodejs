const { Router } = require("express");
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");
const fs = require("fs");
const Comment = require("../models/comment");

const router = Router();

const storageOfImages = multer.diskStorage({
  destination: function (req, file, cb) {
    // const dir = path.resolve(`../public/uploads/${req.user._id}`);
    const dir = path.join(process.cwd(), "public", "uploads", req.user._id);

    // Sync is usually okay here as it's a one-time setup per request
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storageOfImages });

router.get("/add-blog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  let coverImage = req.file.filename;
  let createdBy = req.user._id;
  let params = {
    success: "Blog added successfully!",
  };
  try {
    await Blog.create({
      title,
      body,
      coverImage,
      createdBy,
    });
  } catch (error) {
    params = {
      error: error,
    };
  }
  return res.render("addBlog", params);
});

router.get("/:blogId", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.blogId }).populate(
    "createdBy",
  );
  const comments = await Comment.find({ blogId: req.params.blogId }).populate(
    "userId",
  );
  res.render("blogPage", {
    user: req.user,
    blog,
    comments,
  });
});

module.exports = router;

const { Schema, model } = require("mongoose");

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    coverImage: {
      type: String,
      default: "/images/default.jpeg",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = model("blog", blogSchema);

module.exports = Blog;

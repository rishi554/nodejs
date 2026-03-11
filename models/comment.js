const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  },
  { timestamps: true },
);

const Comment = model("comment", commentSchema);

module.exports = Comment;

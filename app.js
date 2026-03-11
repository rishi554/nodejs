const express = require("express");
const path = require("path");
const dotenv = require("dotenv/config");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const commentRoute = require("./routes/comment");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkUserAuthentication,
} = require("./middlewares/validateUsersAction");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const connectionString = `${process.env.PROTOCAL}${process.env.DBUSERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DATABASE}?authSource=${process.env.AUTHSOURCE}`;

mongoose.connect(connectionString).then(() => {
  console.log("Connected to MongoDB database!");
});
app.use("/user", userRoute);

app.use(checkUserAuthentication("token"));
app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: blogs,
  });
});
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

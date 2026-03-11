const { Router } = require("express");
const UserModel = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await UserModel.matchPasswordAndGenerateToken(
      email,
      password,
    );
    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", {
      error: error,
    });
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.redirect("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await UserModel.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;

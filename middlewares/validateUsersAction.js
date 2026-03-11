const { validateToken } = require("../services/auth");

function checkUserAuthentication(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue)
      return res.render("signin", {
        error: "Session is expired!",
      });

    if (!tokenCookieValue) return next();

    const userPayload = validateToken(tokenCookieValue);
    req.user = userPayload;

    return next();
  };
}

module.exports = {
  checkUserAuthentication,
};

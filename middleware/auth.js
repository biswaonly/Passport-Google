const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get Token From Cookies
  const token = req.cookies.ssid;

  // Check if no Token
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization denied." });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.ssid = decoded.user.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not Valid" });
  }
};

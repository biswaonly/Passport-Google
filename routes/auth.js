const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("config");
const jwt = require("jsonwebtoken");

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// hand control to passport to use code to grab profile info
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    try {
      const payload = {
        user: {
          id: req.user.id
        }
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.cookie("ssid", token, { httpOnly: true });
        return res.redirect("http://localhost:3000/profile");
      });
    } catch (err) {
      console.error(err);
      return res.redirect("http://localhost:3000/login");
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route 	GET api/auth
// @desc 		Test Route
// @access 	Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    // res.header('Access-Control-Allow-Origin',"*")
    // res.header('Access-Control-Allow-Headers')
    console.log(req.user.id);

    try {
      const payload = {
        user: {
          id: req.user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.json({ msg: "Server Error" });
    }
  }
);

module.exports = router;

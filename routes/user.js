const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.ssid).select("-password");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("ssid");
  res.status(200).send("LOGOUT");
});

module.exports = router;

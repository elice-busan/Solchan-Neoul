const express = require("express");
const router = express.Router();

const User = require("../schemas/user");

// 회원가입 라우터
router.post("/signup", async (req, res) => {
  const { username, password, display_name } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists! Please sign up again.",
      });
    }

    const user = new User({ username, password, display_name });
    await user.save();

    res.json({
      http_status: 201,
      success: true,
      msg: "Signup successful!",
      username: username,
      display_name: display_name,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

// 로그인 라우터
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      return res.json({
        http_status: 200,
        msg: "Login successful!",
        username: username,
        display_name: user.display_name,
      });
    } else {
      return res
        .status(401)
        .json({ http_status: 401, msg: "Invalid username or password!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;

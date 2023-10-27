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

/*const fs = require("fs").promises;
const path = require("path");

router.get("/");

router.post("/signup", async (req, res) => {
  const { username, password, display_name } = req.body;
  const usersPath = path.join(__dirname, "../users.json");
  console.log("입력 받은 값 : ");
  console.log(req.body);

  let users;
  try {
    const data = await fs.readFile(usersPath, "utf8");
    users = JSON.parse(data);
  } catch (err) {
    users = [];
  }
  console.log("users: ");
  console.log(users);

  const existingUser = users.some((user) => user.username === username);
  console.log("비교 결과 : ");
  console.log(existingUser);

  if (existingUser) {
    // 회원가입 실패
    return res
      .status(400)
      .json({
        success: false,
        msg: "User already exists! Please sign up again.",
      });
  }

  users.push({ username, password, display_name });
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  // 회원가입에 성공
  res.json({
    http_status: 201,
    success: true,
    msg: "Signup successful!",
    username: username,
    display_name: display_name,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body; // 클라이언트로부터 받은 ID와 비밀번호
  const usersPath = path.join(__dirname, "../users.json");
  console.log("입력 받은 값 : ");
  console.log(req.body);

  let users;
  try {
    const data = await fs.readFile(usersPath, "utf8");
    users = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }

  console.log("users: ");
  console.log(users);

  const existingUser = users.some(
    (user) => user.username === username && user.password === password
  );
  console.log("비교 결과 : ");
  console.log(existingUser);

  if (existingUser) {
    // 로그인 성공
    const user = users.find((user) => user.username === username); // 해당 아이디 배열 찾기
    return res.json({
      http_status: 200,
      msg: "Login successful!",
      username: username,
      display_name: user.display_name,
    });
  } else {
    // 로그인 실패
    return res
      .status(401)
      .json({ http_status: 401, msg: "Invalid username or password!" });
  }
});

module.exports = router;
*/

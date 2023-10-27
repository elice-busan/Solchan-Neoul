/*const express = require("express");
const router = express.Router();
const User = require("../models/User");

const fs = require("fs");
const bookmarks = require("../bookmarks.json");

// 북마크 저장 라우터
router.post("/saveBookmark", (req, res) => {
  const { username, postId } = req.body;
  console.log("username : ", username);
  console.log("postId : ", postId);

  const path = require("path");
  const bookmarksFilePath = path.join(__dirname, "../bookmarks.json");

  if (!bookmarks[username]) {
    bookmarks[username] = [];
  }

  // Add the postId if not already present
  if (!bookmarks[username].includes(postId)) {
    bookmarks[username].push(postId);
  }

  try {
    console.log("추가 후 bookmarks:", bookmarks);
    fs.writeFileSync(bookmarksFilePath, JSON.stringify(bookmarks));
    res.json({ success: true });
  } catch (err) {
    console.error("Error writing to bookmarks.json:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 북마크 삭제 라우터
router.post("/removeBookmark", (req, res) => {
  const { username, postId } = req.body;

  const path = require("path");
  const bookmarksFilePath = path.join(__dirname, "../bookmarks.json");

  if (bookmarks[username]) {
    const index = bookmarks[username].indexOf(postId);
    if (index !== -1) {
      bookmarks[username].splice(index, 1);
    }
  }

  try {
    console.log("삭제 후 bookmarks:", bookmarks);
    fs.writeFileSync(bookmarksFilePath, JSON.stringify(bookmarks));
    res.json({ success: true });
  } catch (err) {
    console.error("Error writing to bookmarks.json:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/getBookmarks/:username", (req, res) => {
  const username = req.params.username;
  res.json(bookmarks[username] || []);
});
*/

const express = require("express");
const router = express.Router();
const User = require("../schemas/user"); // User 모델을 가져옵니다.

// 북마크 저장 라우터
router.post("/saveBookmark", async (req, res) => {
  const { username, postId } = req.body;

  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      // 해당 사용자가 없으면 새로 생성
      user = new User({ username: username, bookmarks: [] });
    }

    // postId가 이미 있지 않으면 추가
    if (!user.bookmarks.includes(postId)) {
      user.bookmarks.push(postId);
      await user.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error saving bookmark:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 북마크 삭제 라우터
router.post("/removeBookmark", async (req, res) => {
  const { username, postId } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const index = user.bookmarks.indexOf(postId);
      if (index !== -1) {
        user.bookmarks.splice(index, 1);
        await user.save();
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error removing bookmark:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/getBookmarks/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username: username });
    res.json(user ? user.bookmarks : []);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;

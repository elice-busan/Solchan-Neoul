const express = require('express');
const router = express.Router();
const bookmarks = require('../bookmarks.json');
const fs = require('fs');

// 북마크 저장 라우터
router.post('/saveBookmark', (req, res) => {
    const { username, postId } = req.body;
    console.log("username : " , username);
    console.log("postId : " , postId);

    const path = require('path');
    const bookmarksFilePath = path.join(__dirname, '../bookmarks.json');

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
router.post('/removeBookmark', (req, res) => {
    const { username, postId } = req.body;
    
    const path = require('path');
    const bookmarksFilePath = path.join(__dirname, '../bookmarks.json');

    
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

router.get('/getBookmarks/:username', (req, res) => {
    const username = req.params.username;
    res.json(bookmarks[username] || []);
});

module.exports = router;

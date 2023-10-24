const express = require('express');
const router = express.Router();

const fs = require('fs').promises;
const path = require('path');

router.get('/')

router.post('/signup', async (req, res) => {
    console.log("확인")
    const { username, password, display_name } = req.body;
    const usersPath = path.join(__dirname, '../users.json');
    console.log(req.body);
    let users;
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        users = [];
    }
    console.log(users)
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        // 회원가입 실패
        return res.status(400).json({ success: false, msg: 'User already exists! Please sign up again.' });
    }

    users.push({ username, password, display_name });
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    // 회원가입에 성공
    res.json({ http_status: 201, success: true, msg: 'Signup successful!' });
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body; // 클라이언트로부터 받은 ID와 비밀번호
    const usersPath = path.join(__dirname, '../users.json');
    
    let users;
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
    }

    const existingUser = users.find(user => user.username === username && user.password === password);
    if (existingUser) {
        // 로그인 성공
        return res.json({ http_status: 200, msg: 'Login successful!' });
    } else {
        // 로그인 실패
        return res.status(401).json({ http_status: 401, msg: 'Invalid username or password!' });
    }
});


module.exports = router;

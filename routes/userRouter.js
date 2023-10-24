const express = require('express');
const router = express.Router();

const fs = require('fs').promises;
const path = require('path');

router.post('/signup', async (req, res) => {
    const { username, password, display_name } = req.body;
    console.log(username);
    console.log(display_name);
    const usersPath = path.join(__dirname, '../users.json');
    
    let users;
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        users = [];
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ http_status: 400, msg: 'User already exists!' });
    }

    users.push({ username, password, display_name });
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    res.json({ http_status: 201, msg: 'Signup successful!' });
});


router.post('/login', (req, res) => {
    // 로그인 로직
});

module.exports = router;

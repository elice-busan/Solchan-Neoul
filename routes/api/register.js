const express = require("express");
const User = require("../../models/User");
const path = require('path');
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');
const router = express.Router();  // Router 객체 생성

const USER_COOKIE_KEY = 'USER';
const USERS_JSON_FILENAME = '../../users.json';

async function fetchAllUsers() {
    const data = await fs.readFile(USERS_JSON_FILENAME);
    const users = JSON.parse(data.toString());
    console.log(users);
    return users;
}

async function fetchUser(userId) {
    const users = await fetchAllUsers();
    const user = users.find((user) => user.userId === userId);
    return user;
}

async function createUser(newUser) {
    const users = await fetchAllUsers();
    users.push(newUser);
    await fs.writeFile(USERS_JSON_FILENAME, JSON.stringify(users));
}

router.use(express.static(path.join(__dirname, 'public')));
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    // 'user'라는 쿠키 데이터를 가져옴
    // 쿠키가 존재하지 않을 경우 로그인이 되지 않았다는 뜻
    const userCookie = req.cookies[USER_COOKIE_KEY];
    
    if (userCookie) {
        // 쿠키가 존재하는 경우, 쿠키 VALUE를 JS 객체로 변환
        const userData = JSON.parse(userCookie);
        // user 객체에 저장된 username이 db에 존재하는 경우,
        // 유효한 user이며 로그인이 잘 되어 있다는 뜻.
        const user = await fetchUser(userData.username);
        if (user) {
            // JS 객체로 변환된 user 데이터에서 username, name, password를 추출하여 클라이언트에 렌더링
            res.status(200).send(`
                <a href="/logout">Log Out</a>
                <h1>id: ${userData.username}, name: ${userData.name}, password: ${userData.password}</h1>
            `);
            return;
        }
    }

    // 쿠키가 존재하지 않는 경우, 로그인 되지 않은 것으로 간주
    res.status(200).send(`
        <a href="/login.html">Log In</a>
        <a href="/signup.html">Sign Up</a>
        <h1>Not Logged In</h1>
    `);
});

router.post('/signup', async (req, res) => {
    console.log("Received signup request:", req.body);

    const { username, userId, userpw } = req.body;
    const user = await fetchUser(userId);

    // 이미 존재하는 userId일 경우 회원 가입 실패
    if (user) {
        res.status(400).send(`${userId}는 이미 존재하는 아이디입니다.`);
        return;
    }

    // 아직 가입되지 않은 userId인 경우 db에 저장
    // KEY = userId, VALUE = { username, userpw }
    const newUser = {
        username,
        userId,
        userpw,
    };
    await createUser({
        username,
        userId,
        userpw,
    });

    // 회원가입 성공 시, 콘솔에 출력
    console.log(`Signup Successful!`);
    console.log(`Username: ${username}`);
    console.log(`UserId: ${userId}`);

    // db에 저장된 user 객체를 문자열 형태로 변환하여 쿠키에 저장
    res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
    // 가입 완료 후, 루트 페이지로 이동
    res.redirect('/start.html');
});



router.post('/login', async (req, res) => {
    const { userId, userpw } = req.body;
    const user = await fetchUser(userId);

    // 가입 안 된 username인 경우
    if (!user) {
        res.status(400).send(`not registered username: ${userId}`);
        return;
    }
    // 비밀번호가 틀렸을 경우
    if (userpw !== user.userpw) {
        res.status(400).send('incorrect password');
        return;
    }

    // db에 저장된 user 객체를 문자열 형태로 변환하여 쿠키에 저장
    res.cookie(USER_COOKIE_KEY, JSON.stringify(user));
    // 로그인(쿠키 발급) 후, 루트 페이지로 이동
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    // 쿠키 삭제 후 루트 페이지로 이동
    res.clearCookie(USER_COOKIE_KEY);
    res.redirect('/');
});

module.exports = router;
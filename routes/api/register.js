const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

// post 방식으로 요청받으면 DB에 회원정보 저장
router.post(
    "/",
    async (req, res) => {
        const { name, id, password } = req.body;
        
        try {
            // id를 비교해서 user가 이미 존재하는지 확인
            // 존재한다면 return해서 뒤의 코드를 실행하지 않음.
            let user = await User.findOne({ id });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }]});
            };

            // user가 존재하지 않으면 새로운 user에 대해서 DB에 추가
            user = new User({
                name,
                id,
                password,
            });

            // bcrypt 모듈을 이용해 salt값을 부여하며 password 암호화
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // 암호화된 내용까지 포함해 DB에 user를 저장.
            await user.save();

            // 성공했다는 메시지를 응답으로 보냅니다.
            res.send("Success");
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        };
    }
);

module.exports = router;
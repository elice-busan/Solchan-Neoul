// models/User.js
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// mongoDB에 회원정보를 저장할 스키마를 userSchema에 정의
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        trim: true,  // 공백을 없애주는 역할
        unique: 1,  // 똑같은 아이디를 쓰지 못하도록
        required: true,
    },
    userpw: {
        type: String,
        required: true,
    },
})

// UserSchema를 사용하여 User 모델을 생성하고 내보냅니다.
const User = mongoose.model('User', UserSchema);
module.exports = User;
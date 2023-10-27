const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
});

// 모델 설정 (외부로 내보냄)
module.exports = mongoose.model("User", userSchema);

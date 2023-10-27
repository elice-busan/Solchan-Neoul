const mongoose = require("mongoose");
const fs = require("fs");
const postsJson = require("../posts.json");
const Board = require("../schemas/board");
const mongodbConnection = require("../config/mongodb-connection");

const uri = mongodbConnection.mongoURL;

const connect = () => {
  mongoose.set("debug", true);

  mongoose
    .connect(uri, {
      dbName: "Cluster0",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("몽고디비 연결 성공");
      loadData();
    })
    .catch((error) => {
      console.log("몽고디비 연결 에러", error);
    });
};

const loadData = async () => {
  try {
    const posts = postsJson;

    for (let post of posts) {
      const exists = await Board.findOne({ id: post.id });
      if (!exists) {
        const newBoard = new Board(post);
        await newBoard.save();
        console.log("Data saved for post:", post.id);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

connect();

mongoose.connection.on("error", (error) => {
  console.log("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
  connect();
});

require("./user");
require("./board");

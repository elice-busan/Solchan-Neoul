const express = require("express");
const fs = require('fs');
const connectDB = require("./db")
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
// Body Parser 미들웨어 설정
app.use(express.json());
// request.body에서 데이터를 가져올 수 있게 해준다
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});

app.get('/tourDetail/:id', (req, res) => {
  const id = req.params.id; // URL에서 ID 캡쳐

    // 데이터 소스(예: posts.json)가 있다고 가정할 때
  // 데이터 소스에서 'id' 파라미터를 기반으로 데이터를 검색
  fs.readFile('posts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    const posts = JSON.parse(data);

    // 주어진 ID에 해당하는 특정 데이터 찾기
    const tourData = posts.find(item => item.id === id);

    if (!tourData) {
      return res.status(404).send("Tour not found");
    }

    // 데이터를 JSON으로 전송
    res.json(tourData);
  });
});

app.get('/tourList', (req, res) => {
  console.log("..");
  fs.readFile('posts.json', 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send("Internal Server Error");
      }
      const posts = JSON.parse(data);
      res.json(posts);
  });
});

app.use("/", userRouter);

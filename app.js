const express = require("express");
const fs = require("fs");
const connect = require("./schemas");

const userRouter = require("./routes/userRouter");
const bookmarksRouter = require("./routes/bookmarksRouter");
const Board = require("./schemas/board");
const User = require("./schemas/user");
const tourRouter = require("./routes/tourData");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
// Body Parser 미들웨어 설정
app.use(express.json());
// request.body에서 데이터를 가져올 수 있게 해준다
app.use(express.urlencoded({ extended: true }));

app.get("/tourDetail/:id", (req, res) => {
  const id = req.params.id; // URL에서 ID 캡쳐

  // 데이터 소스(예: posts.json)가 있다고 가정할 때
  // 데이터 소스에서 'id' 파라미터를 기반으로 데이터를 검색
  fs.readFile("posts.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    const posts = JSON.parse(data);

    // 주어진 ID에 해당하는 특정 데이터 찾기
    const tourData = posts.find((item) => item.id === id);

    if (!tourData) {
      return res.status(404).send("Tour not found");
    }

    // 데이터를 JSON으로 전송
    res.json(tourData);
  });
});

app.get("/api/tourList", async (req, res) => {
  try {
    console.log("확인용");
    const tours = await Board.find();
    res.json(tours);
  } catch (error) {
    console.error("Error fetching tour list:", error); // 오류 로깅
    res.status(500).send("Internal Server Error");
  }
});

// 북마크된 게시물 데이터 가져오기
app.post("/getBookmarkedTours", async (req, res) => {
  const { bookmarkedPostIds } = req.body;

  try {
    const bookmarkedTours = await Board.find({
      id: { $in: bookmarkedPostIds },
    });
    res.json(bookmarkedTours);
  } catch (err) {
    console.error("Error fetching bookmarked tours:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 사용자 정보를 제공하는 API 엔드포인트를 작성
app.get("/api/user/:username", (req, res) => {
  const { username } = req.params;

  // User 모델을 사용하여 사용자 정보를 조회
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        // 사용자를 찾지 못한 경우 404 에러 응답
        return res.status(404).json({ message: "User not found" });
      }

      // 사용자 정보를 클라이언트에게 JSON 형식으로 응답
      res.json(user);
    })
    .catch((error) => {
      // 에러가 발생한 경우 500 에러 응답
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.use("/", userRouter);

app.use(bookmarksRouter);

app.use("/", tourRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});

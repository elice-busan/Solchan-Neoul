const express = require("express");
const fs = require('fs');
const connectDB = require("./db")
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});

app.get("/tourDetail/:id", async(req,res) => {
  res.render("Detail", {
    title: "test"
  })
})

app.get('/tourList', (req, res) => {
  fs.readFile('posts.json', 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send("Internal Server Error");
      }
      const posts = JSON.parse(data);
      res.json(posts);
  });
});

app.use("/user/signup", require("./routes/api/register"));

// allow us to get the data in request.body
app.use(express.json({ extended: false }));

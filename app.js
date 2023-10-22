const express = require("express");
const fs = require('fs');
const app = express();
const PORT = 3000;

/*
const mongodbConnection = require("./config/mongodb-connection");

let collection;
app.listen(3000, async()=>{
    console.log("Server started");
    const MongoClient = await mongodbConnection();
    collection = mongodbClient.db().collection("post");
    console.log("MpngoDB connected");
})
*/

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

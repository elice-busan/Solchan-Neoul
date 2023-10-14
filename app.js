const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static('public'));

/*
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/main.html');
  });
  */

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});
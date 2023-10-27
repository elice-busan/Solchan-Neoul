const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

router.post("/posts", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ _id: _id }, null);
    res.json({ list: board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ _id });
    res.json({ board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;

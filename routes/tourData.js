// routes/tourRouter.js
const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

router.get("/tourDetail/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const tourData = await Board.findOne({ id });
    if (!tourData) {
      return res.status(404).send("Tour not found");
    }

    res.json(tourData);
  } catch (error) {
    console.error("Error fetching tour detail:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/tourList", async (req, res) => {
  try {
    const tours = await Board.find({});
    res.json(tours);
  } catch (error) {
    console.error("Error fetching tour list:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

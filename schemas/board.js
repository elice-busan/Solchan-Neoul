const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  fare: {
    type: String,
  },
  holiday: {
    type: String,
  },
  operating: {
    type: String,
  },
  subway: {
    type: String,
  },
  bus: {
    type: String,
  },
  remark: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Board", boardSchema);

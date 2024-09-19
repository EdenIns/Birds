const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Article", articleSchema);

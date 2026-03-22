const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  currentPrice: Number,
  history: [Number],
  seller: {
    rating: Number,
    reviews: Number,
  },
});

module.exports = mongoose.model("Product", productSchema);

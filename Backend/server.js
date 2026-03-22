const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(
  "mongodb+srv://rahul:Rahul123@backend.owxdm1h.mongodb.net/SmartBuy",
);

// Schema .
const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  currentPrice: Number,
  history: [Number],
  seller: {
    rating: Number,
    reviews: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

// 🔥 Extract product ID from Flipkart URL
function extractProductId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("pid"); // Flipkart uses pid
  } catch {
    return null;
  }
}

// API
app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  const productId = extractProductId(url);

  if (!productId) {
    return res.json({ error: "Invalid URL" });
  }

  const product = await Product.findOne({ productId });

  if (!product) {
    return res.json({ error: "Product not found in DB" });
  }

  const history = product.history;

  const avg = history.reduce((a, b) => a + b, 0) / history.length;

  const current = product.currentPrice;

  // Decision Logic
  let decision = "Neutral 🤔";

  if (current < avg * 0.8) {
    decision = "Best Time to Buy this Product ✅";
  } else if (current > avg * 1.25) {
    decision = "WAIT ⏳";
  }

  // Seller Logic
  let sellerStatus = "Trustworthy ✅";

  if (product.seller.rating < 3.5 || product.seller.reviews < 50) {
    sellerStatus = "Not Reliable ⚠️";
  }

  res.json({
    name: product.name,
    current,
    avg,
    history,
    decision,
    sellerStatus,
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));

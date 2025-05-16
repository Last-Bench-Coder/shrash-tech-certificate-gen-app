const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const certificateRoutes = require("../routes/certificateRoutes.js"); // Adjust path if needed
require("dotenv").config();
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static folder for images
app.use("/images", express.static(path.join(__dirname, "../images")));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Certificate Generation API");
});
app.use("/api/certificates", certificateRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,  // Fail fast if cannot connect
    socketTimeoutMS: 45000,          // Disconnect slow sockets
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Initial MongoDB Connection Error:", err.message);
  });

// Optional: Event listeners for better observability
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Mongoose disconnected from DB");
});

// Export app (do not call app.listen if using serverless or Vercel)
module.exports = app;

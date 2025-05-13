const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const certificateRoutes = require("../routes/certificateRoutes.js"); // adjust path
require("dotenv").config();
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Certificate Generation API");
});
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/api/certificates", certificateRoutes);

// ✅ Don't call app.listen()
// ✅ Export the Express app instead
module.exports = app;

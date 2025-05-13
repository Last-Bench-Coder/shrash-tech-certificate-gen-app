const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentName: String,
  courseName: String,
  date: Date,
  email: String,
  phone: String,
  instituteName: String,
  instituteAddress: String,
  institutePhone: String,
  instituteEmail: String,
  instituteLogo: String,
  signatureName: String,
  certificateId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", certificateSchema);

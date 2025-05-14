const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  instituteName: { type: String, required: true, trim: true },
  instituteAddress: { type: String, trim: true },
  institutePhone: { type: String, trim: true },
  instituteEmail: { type: String, trim: true, lowercase: true },
  instituteLogo: { type: String },
  signatureName: { type: String, trim: true },
  certificateId: { type: String, required: true, unique: true },
  htmlContent: { type: String }, // Removed `required: true` to allow dynamic setting
  status: { type: String, enum: ['Created', 'Sent', 'Failed'], default: "Created" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", certificateSchema);

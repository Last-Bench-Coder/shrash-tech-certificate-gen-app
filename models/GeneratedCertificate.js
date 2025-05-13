const mongoose = require('mongoose');

const generatedCertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  certificateId: { type: String, required: true },
  htmlContent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneratedCertificate', generatedCertificateSchema);

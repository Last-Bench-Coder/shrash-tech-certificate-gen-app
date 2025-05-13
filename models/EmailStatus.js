const mongoose = require('mongoose');

const emailStatusSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['sent', 'failed'],
    required: true,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate',
  },
});

module.exports = mongoose.model('EmailStatus', emailStatusSchema);

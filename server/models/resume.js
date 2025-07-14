// server/models/Resume.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  originalName: String,
  text: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);

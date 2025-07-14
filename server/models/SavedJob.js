const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
  title: String,
  matchedSkills: [String],
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SavedJob", savedJobSchema);

const express = require("express");
const router = express.Router();
const SavedJob = require("../models/SavedJob");

// ✅ POST route to save a job
router.post("/", async (req, res) => {
  try {
    const { title, matchedSkills } = req.body;
    const newJob = new SavedJob({ title, matchedSkills });
    await newJob.save();
    res.status(200).json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving job" });
  }
});

// ✅ GET route to fetch all saved jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await SavedJob.find().sort({ savedAt: -1 }); // newest first
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved jobs" });
  }
});

// ✅ DELETE route to delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ✅ PUT route to update a job's title by ID
router.put("/:id", async (req, res) => {
  try {
    const { title } = req.body;
    await SavedJob.findByIdAndUpdate(req.params.id, { title });
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;

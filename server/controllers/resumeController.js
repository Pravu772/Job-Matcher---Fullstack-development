const Resume = require("../models/resume");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const jobRoles = require("../data/jobRoles"); // ✅ Add this

// Job recommender logic
const getJobRecommendations = (text) => {
  const lowerText = text.toLowerCase();
  const matchedRoles = [];

  jobRoles.forEach((role) => {
    const matches = role.keywords.filter((keyword) =>
      lowerText.includes(keyword)
    );

    if (matches.length >= 2) {
      matchedRoles.push({
        title: role.title,
        matchedSkills: matches,
        score: matches.length,
      });
    }
  });

  matchedRoles.sort((a, b) => b.score - a.score);
  return matchedRoles;
};

// Upload Controller
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(filePath).toLowerCase();

    let extractedText = "";

    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Save to MongoDB
    await Resume.create({
      originalName: req.file.originalname,
      text: extractedText,
    });

    // Match job roles
    const recommendations = getJobRecommendations(extractedText);

    res.status(200).json({
      message: "Resume uploaded and text extracted successfully!",
      text: extractedText,
      originalName: req.file.originalname,
      recommendations, // 👈 send to frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading or parsing resume" });
  }
};

module.exports = { uploadResume };

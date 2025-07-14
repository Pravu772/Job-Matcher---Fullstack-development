const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadResume } = require("../controllers/resumeController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;

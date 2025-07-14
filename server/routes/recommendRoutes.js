const express = require("express");
const router = express.Router();
const { recommendJob } = require("../controllers/recommendController");

router.post("/recommend", recommendJob);

module.exports = router;

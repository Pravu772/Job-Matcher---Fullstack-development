const jobRoles = require("../data/jobRoles");

const recommendJob = (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ message: "No resume text provided" });
  }

  const lowerText = resumeText.toLowerCase();
  const matches = [];

  jobRoles.forEach((job) => {
    const matchCount = job.keywords.filter((word) =>
      lowerText.includes(word)
    ).length;

    if (matchCount >= 2) {
      matches.push({
        title: job.title,
        matchedSkills: matchCount,
      });
    }
  });

  res.status(200).json({
    recommendedJobs: matches,
  });
};

module.exports = { recommendJob };

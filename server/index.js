const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const savedJobsRoutes = require("./routes/savedJobs");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/resume", resumeRoutes);
app.use("/api/job", recommendRoutes); 
app.use("/api/saved-jobs", savedJobsRoutes);
app.use("/api/auth", authRoutes);

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Error:", err));

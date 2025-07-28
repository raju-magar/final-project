const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// [GET] Fetch all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// [POST] Add a new job
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, location, company, salary, type } = req.body;

    // req.user should be set by authMiddleware if user is logged in
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newJob = new Job({
      title,
      description,
      location,
      company,
      salary,
      type,
      postedBy: req.user._id,  // Assign logged-in user's id here
    });

    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

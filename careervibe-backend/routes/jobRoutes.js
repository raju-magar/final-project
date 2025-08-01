const express = require("express");
const mongoose = require("mongoose");
const Job = require("../models/Job");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const { postedBy } = req.query;
    const jobs = postedBy
      ? await Job.find({ postedBy })
      : await Job.find(); // No filter if not employer

    res.json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});


router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      company,
      salary,
      jobType,
      experienceLevel,
      applicationDeadline,
      contactEmail,
    } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newJob = new Job({
      title,
      description,
      location,
      company,
      salary,
      jobType,
      experienceLevel,
      applicationDeadline,
      contactEmail,
      postedBy: req.user._id,
    });

    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Failed to create job", error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    Object.assign(job, req.body);
    await job.save();

    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job", error: error.message });
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure user is the owner
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.deleteOne();  // ✅ use deleteOne instead of remove()
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ message: "Server error while deleting job", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const job = require("../models/Job");

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

//  [POST] Add a new jobs
router.post("/", async (Req, res) => {
    try {
        const { title, description, location, company, salary } = req.body;

        // Basic validation
        if (!title || !description || !location || !company) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }
        const newJob = new Job({ title, description, location, company, salary });
        await newJob.save();

        res.status(201).json({ message: "job created successfully", job: newJob});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;
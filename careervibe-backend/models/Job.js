// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: String,
  location: String,
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
    default: "Full-Time",
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;


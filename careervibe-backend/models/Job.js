const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  company: { type: String },
  salary: { type: Number },
  jobType: { type: String },
  experienceLevel: { type: String },
  applicationDeadline: { type: Date },
  contactEmail: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);

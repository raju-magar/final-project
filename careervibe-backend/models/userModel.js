const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["employer", "job-seeker"],
    default: "job-seeker"
  },
  profile: {
    fullName: String,
    bio: String,
    website: String,
    location: String,
    avatar: String
  }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

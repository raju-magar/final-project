const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
// Register Endpoint
router.post("/register", async (req, res) => {
	try {
const { fullName, username, email, mobile, password, role } = req.body;

// Validate input
if (!fullName || !username || !email || !mobile || !password || !role) {
return res.status(400).json({ message: "All fields are required" });
}
if (!["job-seeker", "employer"].includes(role)) {
return res.status(400).json({ message: "Invalid role" });
}

// Check for existing user
const existingUser = await User.findOne ({ $or: [{ email }, { username }] });
if (existingUser) {
return res.status(400).json({ message: "Email or Username already registered" });
}

// Create user (password is hashed by pre-save hook")
const user = new User({ fullName, username, email, mobile, password, role });
await user.save();

// Generate JWT
const token = jwt.sign(
	{ id: user._id, role: user.role }, process.env.JWT_SECRET || "your_secret-key",
	{ expiresIn: "1h" }, 
);

res.status(201).json({ token, user: user._id, fullName: user.fullName, email: user.email, role: user.role  });
} catch (error) {
res.status(500).json({ message: error.message });
}
});
// Login Endpoint
router.post("/login", async (req, res) => {
try {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).json({ message: "Invalid credentials" });
}

const isMatch = await user.matchPassword(password);
if (!isMatch) {
	return res.status(400).json({ message: "Invalid credentials" });
}

const token = jwt.sign(
	{ id: user._id, role: user.role },
	process.env.JWT_SECRET || "your-secret-key",
	{ expiresIn: "1h" }
);
	res.json({ token, user: user._id, fullName: user.fullName, username: user.username, email: user.email, role: user.role });
	} catch (error){
	res.status(500).json({ message: error.message });
}
});

module.exports = router;

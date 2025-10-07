const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { checkSession } = require("../middleware/checkSession");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if username OR email already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    // Set user session after registration
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.status(201).json({ message: "User registered", user: req.session.user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Set user session after successful login
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    await req.session.save(); // save session explicitly

    console.log('Session set after login:', req.session.user);
    res.json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Check session
router.get("/check-session", (req, res) => {
  console.log('Session:', req.session);
  if (req.session.user) {
    res.json({ user: req.session.user, isAuthenticated: true });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // clear session cookie
    res.json({ message: "Logged out" });
  });
});

module.exports = router;

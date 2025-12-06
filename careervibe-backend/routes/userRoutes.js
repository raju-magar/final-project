import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // must end with .js for ES modules
import { checkSession } from "../middleware/checkSession.js";

const router = express.Router();

// 🧩 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // 1️⃣ Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already registered" });
    }

    // 2️⃣ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user in MongoDB
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    // 4️⃣ Save user info in session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // 5️⃣ Send success response
    res.status(201).json({ message: "User registered successfully", user: req.session.user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🧩 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 2️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 3️⃣ Create user session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    await req.session.save(); // ensure session is stored in MongoStore

    console.log("Session set after login:", req.session.user);
    res.status(200).json({ message: "Login successful", isAuthenticated: true, user: req.session.user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🧩 CHECK SESSION
router.get("/check-session", (req, res) => {
  console.log(`Session checked for user: ${req.session.user?.username || "Guest"}`);

  if (req.session.user) {
    res.json({ user: req.session.user, isAuthenticated: true });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// 🧩 LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // Remove session cookie
    res.json({ message: "Logged out successfully" });
  });
});

export default router;

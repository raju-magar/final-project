const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("jsonwebtoken");
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Make sure you have this

router.post("?login", async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    } 

    //  Generate JWT token
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

    //  Set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set true in production with HTTPS
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour 
    });

    res.json({ message: "Login in successfully" });
})

// Protect the route with authMiddleware
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;

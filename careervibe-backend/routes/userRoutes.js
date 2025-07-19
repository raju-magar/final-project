const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 

// @route POST /api/users/login
// @desc Authenticate user & get token
// @access public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        // Check is user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "INvalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user: { id: user._id, username: user.username } },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Change to true in production with HTTPS
            sameSite: "lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({ message: "login successful" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});
  
// @route GET /api/users/profile
// @desc Get user profile (protected)
// @access private
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
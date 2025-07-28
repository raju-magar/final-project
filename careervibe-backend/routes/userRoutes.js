const express = require ("express");
const router = express.Router();
const {
    loginUser,
    getUserProfile,
    registerUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware")

// Auth routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", authMiddleware, getUserProfile);

// Session checking route
router.get("/check-session", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
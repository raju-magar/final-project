const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Make sure you have this

// Protect the route with authMiddleware
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;

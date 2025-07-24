const express = require ("express");
const router = express.Router();
const {
    loginUser,
    getUserProfile,
    registerUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
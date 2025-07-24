const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Login User & get token
// @route POST /api/users/login
// @access public
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check is user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare entered password with hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if(!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60*60*1000, // 1 hour
  });

  res.status(200).json({ 
  message: "Login successful",
  user: {
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
},
  token,
});
} catch (error) {
   console.error("Login Error:", error.message);
   res.status(500).json({ message: "server error" });
}
};

// @desc Register New User 
// @route POST /api/users/register
// @access public 
exports.registerUser = async (req, res) => {
  const { username, email, password, fullname, mobile, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // validate role
    if (role && !["employer", "job-seeker"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    // correctly create the user here
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile: {
        fullName: fullname,
      },
      mobile,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Respond with user data and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.profile.fullName,
        mobile: user.mobile,
    },
    token,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error " });
  }
};

//  @desc Get-in User Profile
// @route GET /api/users/profile
// @access private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
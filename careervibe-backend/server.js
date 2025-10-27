const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Load environment variables first
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware setup
app.use(express.json());
app.use(cookieParser());


// Express-session configuration
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Debug session (single next)
app.use((req, res, next) => {
  if (req.session.user) {
    console.log("🟢 Active Session ID:", req.sessionID);
    console.log("🟢 Session Data:", req.session.user);
  }
  next();
});

// Routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

// 404 route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error Stack:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));

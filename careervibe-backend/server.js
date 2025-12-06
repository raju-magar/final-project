import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Routes
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const connectDB = require("../config/db");
const path = require("path");
const dotenv = require("dotenv");
const userRoutes = require("../routes/userRoutes");
const attendanceRoutes = require("../routes/attendanceRoutes");
const assignmentRoutes = require("../routes/assignmentRoutes");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Auth-Token"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Export the serverless function
module.exports = serverless(app);

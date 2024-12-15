const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const connectDB = require("./config/db");
const path = require('path');
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const attendenceRoutes = require("./routes/attendanceRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("colors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: '*', // Allows requests from all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/attendence", attendenceRoutes);
// app.use("/api/assignments", assignmentRoutes);
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.red.bold)
);

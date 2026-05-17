const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Base Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GlobalTNA API is running",
  });
});

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
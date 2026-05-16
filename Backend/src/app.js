const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GlobalTNA API is running",
  });
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
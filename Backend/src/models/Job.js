const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: ["Plumbing", "Electrical", "Painting", "Joinery"],
      required: [true, "Category is required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    contactName: {
      type: String,
      trim: true,
    },

    contactEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");

const Job = require("../models/Job");

dotenv.config();

connectDB();

const jobs = [
  {
    title: "Need plumber for leaking tap",
    description: "Kitchen tap leaking badly",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "John",
    contactEmail: "john@example.com",
  },

  {
    title: "Paint my living room",
    description: "Need white paint for walls",
    category: "Painting",
    location: "Edinburgh",
    contactName: "Sarah",
    contactEmail: "sarah@example.com",
  },

  {
    title: "Fix electrical wiring",
    description: "Power issue in kitchen",
    category: "Electrical",
    location: "London",
    contactName: "Mike",
    contactEmail: "mike@example.com",
  },
];

const importData = async () => {
  try {
    await Job.deleteMany();

    await Job.insertMany(jobs);

    console.log("Sample jobs inserted");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();
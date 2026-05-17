const asyncHandler = require("express-async-handler");
const Job = require("../models/Job");

// GET ALL JOBS

const getJobs = asyncHandler(async (req, res) => {
  const { category, status, search } = req.query;

  let filter = {};

  // Filter by category
  if (category) {
    filter.category = category;
  }

  // Filter by status
  if (status) {
    filter.status = status;
  }

  // BONUS: Search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    jobs,
  });
});

// GET SINGLE JOB

const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json({
    success: true,
    job,
  });
});

// CREATE JOB

const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    contactName,
    contactEmail,
  } = req.body;

  // Basic validation
  if (
    !title ||
    !description ||
    !category ||
    !location ||
    !contactEmail
  ) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const job = await Job.create({
    title,
    description,
    category,
    location,
    contactName,
    contactEmail,
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
});


// UPDATE STATUS ONLY

const updateJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["Open", "In Progress", "Closed"];

  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  job.status = status;

  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    message: "Job status updated",
    job: updatedJob,
  });
});


// DELETE JOB

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
};
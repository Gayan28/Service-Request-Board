const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL + CREATE
router.route("/")
  .get(getJobs)
  .post(protect, createJob);

// GET SINGLE + UPDATE + DELETE
router.route("/:id")
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(protect, deleteJob);

module.exports = router;
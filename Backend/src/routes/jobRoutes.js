const express = require("express");

const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// GET ALL + CREATE
router.route("/")
  .get(getJobs)
  .post(createJob);

// GET SINGLE + UPDATE + DELETE
router.route("/:id")
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(deleteJob);

module.exports = router;
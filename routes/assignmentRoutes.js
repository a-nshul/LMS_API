const express = require("express");
const {
  createAssignment,
  getAssignments,
  submitAssignment,
} = require("../controllers/assignmentController");

const router = express.Router();

router.route("/").post(createAssignment).get(getAssignments);
router.route("/submit").post(submitAssignment);

module.exports = router;

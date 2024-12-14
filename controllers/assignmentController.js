const asyncHandler = require("express-async-handler");
const Assignment = require("../models/Assignment");

const createAssignment = asyncHandler(async (req, res) => {
  const { teacher, title, description, dueDate } = req.body;

  if (!teacher || !title || !description || !dueDate) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const assignment = await Assignment.create({ teacher, title, description, dueDate });
  res.status(201).json({ assignment, message: "Assignment created successfully" });
});

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({}).populate("teacher", "name email");
  res.status(200).json({ assignments, message: "Assignments fetched successfully" });
});

const submitAssignment = asyncHandler(async (req, res) => {
  const { assignmentId, student, fileUrl } = req.body;

  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) {
    res.status(404).json({ message: "Assignment not found" });
    return;
  }

  assignment.submissions.push({ student, fileUrl });
  await assignment.save();

  res.status(201).json({ message: "Assignment submitted successfully" });
});

module.exports = { createAssignment, getAssignments, submitAssignment };

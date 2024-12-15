const Assignment = require('../models/Assignment');

// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const { teacherName, teacherEmail, title, description, dueDate } = req.body;

    const newAssignment = new Assignment({
      teacherName,
      teacherEmail,
      title,
      description,
      dueDate,
    });

    await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
};

// Fetch assignments
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found' });
    }
    res.status(200).json({ assignments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentName, studentEmail } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Push the student's submission details
    assignment.submissions.push({
      studentName,
      studentEmail,
      fileUrl,
    });

    await assignment.save();
    res.status(200).json({ message: 'Assignment submitted successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
};

module.exports = { createAssignment, getAssignments, submitAssignment };

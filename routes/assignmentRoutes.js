const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const upload = require('../middleware/upload');

// Create a new assignment
router.post('/create', assignmentController.createAssignment);

// Fetch all assignments
router.get('/', assignmentController.getAssignments);

// Submit an assignment with file upload
router.post('/submit/:assignmentId', upload.single('file'), assignmentController.submitAssignment);

module.exports = router;

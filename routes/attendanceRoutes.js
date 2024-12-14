const express = require('express');
const { markAttendance, getAttendance, updateAttendance,deleteAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, markAttendance);
router.get('/', protect, getAttendance);
router.put('/:id', protect, updateAttendance);
router.delete('/:id', protect, deleteAttendance);
module.exports = router;

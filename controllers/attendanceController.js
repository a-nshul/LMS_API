const Attendence = require("../models/Attendance");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// Mark Attendance
const markAttendance = asyncHandler(async (req, res) => {
  const { student, status, course } = req.body;

  if (!student || !status || !course) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Validate if the student ID exists
    const existingStudent = await User.findById(student);
    if (!existingStudent) {
      return res.status(404).json({ message: "Invalid student ID. User does not exist" });
    }

    // Create attendance record
    const newAttendance = await Attendence.create(req.body);

    // Populate the student details
    const populatedAttendance = await Attendence.findById(newAttendance._id).populate("student", "name email");

    res.status(201).json({
      _id: populatedAttendance._id,
      student: populatedAttendance.student,
      date: populatedAttendance.date,
      status: populatedAttendance.status,
      course: populatedAttendance.course,
      message: "Attendance created successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getAttendance =asyncHandler(async(req,res)=>{
  try{
    const attendance = await Attendence.find().populate("student", "name email");
    res.status(200).json({attendance, message: "Attendance fetched successfully"})
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

// Update Attendance
const updateAttendance =asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params;
    const {date, status, course } = req.body;
    if(!date || !status || !course){
      return res.status(400).json({message:"plz provide all required fields"})
    }
    const updatedAttendance = await Attendence.findByIdAndUpdate(id,{date, status, course,},{new:true});
    res.status(200).json({message:"Attendance updated successfully", updatedAttendance})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})
const deleteAttendance =asyncHandler(async(req,res)=>{
  try {
    const {id}=req.params;
    await Attendence.findByIdAndDelete(id);
    res.status(200).json({message:"Attendance deleted successfully"})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})
module.exports = { markAttendance,getAttendance,updateAttendance,deleteAttendance };

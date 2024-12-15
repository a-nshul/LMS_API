const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    submissions: [
      {
        studentName: {
          type: String,
        },
        studentEmail: {
          type: String,
        },
        fileUrl: {
          type: String,
        },
        submittedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;

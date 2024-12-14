const mongoose = require('mongoose');

const attendenceSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    status:{
        type:String,
        enum:['Present','Absent','Late'],
        default:'Present'
    },
   course:{
    type:String,
    required:true,
   },

},{timeseries:true});

const attendence=mongoose.model('Attendence',attendenceSchema)

module.exports=attendence;
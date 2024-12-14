const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../config/generateToken");


const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword);
    const count = await User.countDocuments(keyword); 

    res.status(200).json({ users, count, message: "Users found successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const UserbyId =asyncHandler(async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    if(!user){
      res.status(404).json({message:"User not found"})
    }
    res.status(200).json({user,message:"User fetched successfully"})
  }
  catch(error){
    res.status(400);
    throw new Error(error.message);
  }
})
const registerUser = asyncHandler(async (req, res) => {
  try{
    const { name, email, password,role } = req.body;
    if(!name || !email || !password || !role){
      res.status(400).json({message:"plz provide all required fields"})
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
      res.status(400).json({message:"user already exist"})
    }
    const user=await User.create({
      name,
      email,
      password,
      role
    })
    res.status(201).json({user,token: generateToken(user._id),message:"User created successfully"})
  }
  catch(error){
    res.status(400);
    throw new Error(error.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const{email,password}=req.body;
    if(!email || !password){
      res.status(400).json({message:"plz provide all required fields"})
    }
    const user =await User.findOne({email});
    if(!user){
          res.status(400).json({message:"user not found"})
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
          res.status(400).json({message:"invalid credentials"})
        }
        res.status(200).json({user,token: generateToken(user._id),message:"User logged in successfully"})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

module.exports = { allUsers, registerUser, authUser,UserbyId };
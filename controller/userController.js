const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");




//Create a user

const createUser = asyncHandler(async(req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser) {
        const newUser = await User.create(req.body);
        res.json({
            msg: "User created successfully",
            success: true,
            newUser
        });
    } else {
        throw new Error("User Already Exists")
    }
})



//Login user

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    //check if user exists or not
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        throw new Error("Credential Invalid");
    }
})



//get all user

const getUsers = asyncHandler(async(req,res) => {
    try {
        const users = await User.find();
        res.json({
            success:true,
            users
        })
    } catch (error) {
        throw new Error(error);
    }
})







 

module.exports = {createUser,loginUser, getUsers};
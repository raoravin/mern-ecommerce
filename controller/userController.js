const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async(req,res) => {
    const email = req.body.email;
    console.log("hello");
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
 

module.exports = {createUser,loginUser};
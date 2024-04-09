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

 

module.exports = {createUser};
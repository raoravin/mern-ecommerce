const User = require("../models/userModel");


const createUser = async(req,res) => {
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
        res.send({
            msg:"User Already exists",
            success: false,
        })
    }
}

 

module.exports = {createUser};
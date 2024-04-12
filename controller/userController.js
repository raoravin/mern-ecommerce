const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");


//Create a user

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json({
      msg: "User created successfully",
      success: true,
      newUser,
    });
  } else {
    throw new Error("User Already Exists");
  }
});

//Login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Credential Invalid");
  }
});

//get all user

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      msg: "Users Fetched",
      users,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get a user

const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongodbId(id);
    const user = await User.findById(id);
    if (!user) {
      res.json({
        success: false,
        msg: "user not found",
      });
    }
    res.json({
      success: true,
      msg: "user fetched",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete a user

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.json({
      success: true,
      msg: "User deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a User

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const updateduser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json({
      success: true,
      msg: "user updated",
      updateduser,
    });
  } catch (error) {
    throw new Error(error);
  }
});


//block a user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      msg: "user blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});


//unblock a user
const unBlockUser = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      success: true,
      msg: "user unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
};

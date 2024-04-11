const express = require("express");
const { createUser, loginUser, getUsers, getUser, deleteUser, updateUser } = require("../controller/userController");
const {authMiddleware, isAdmin}= require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/register",createUser);
router.post("/login", loginUser);
router.get("/get-users", getUsers);
router.get("/:id",authMiddleware,isAdmin,getUser);
router.delete("/:id", deleteUser);
router.put("/:id",updateUser)


module.exports = router;
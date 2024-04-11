const express = require("express");
const { createUser, loginUser, getUsers, getUser } = require("../controller/userController");
const router = express.Router();


router.post("/register",createUser);
router.post("/login", loginUser);
router.get("/get-users", getUsers);


module.exports = router;
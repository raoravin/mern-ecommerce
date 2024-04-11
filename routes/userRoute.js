const express = require("express");
const { createUser, loginUser, getUsers, getUser, deleteUser } = require("../controller/userController");
const router = express.Router();


router.post("/register",createUser);
router.post("/login", loginUser);
router.get("/get-users", getUsers);
router.get("/:id",getUser);
router.delete("/:id", deleteUser)


module.exports = router;
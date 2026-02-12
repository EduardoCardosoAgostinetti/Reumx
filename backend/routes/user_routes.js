const express = require("express");
const router = express.Router();
const {  createUser, loginUser, forgotPassword, resetPassword, updateFullName, updateEmail, updatePassword } = require("../controllers/user_controllers");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-fullname", updateFullName);
router.post("/update-email", updateEmail);
router.post("/update-password", updatePassword);

module.exports = router;

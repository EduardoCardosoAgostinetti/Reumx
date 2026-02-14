const express = require("express");
const router = express.Router();
const {  createUser, loginUser, forgotPassword, resetPassword, updateFullName, updateEmail, updatePassword, sendContactMessage } = require("../controllers/user_controllers");

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-fullname", updateFullName);
router.post("/update-email", updateEmail);
router.post("/update-password", updatePassword);
router.post("/contact", sendContactMessage);

module.exports = router;

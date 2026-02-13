const { User } = require("../models/user_model");
const { apiResponse, capitalizeFullName, isValidEmail, sendResetEmail, isAtLeast18 } = require("../settings/helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.createUser = async (req, res) => {
  try {
    let { fullName, email, password, confirmPassword, birthdate } = req.body;

    if (!fullName)
      return apiResponse(res, false, "MISSING_FULLNAME", "The 'Full Name' field is required.", null, 400);
    if (!email)
      return apiResponse(res, false, "MISSING_EMAIL", "The 'Email' field is required.", null, 400);
    if (!isValidEmail(email))
      return apiResponse(res, false, "INVALID_EMAIL", "The provided email is not valid.", null, 400);
    if (!birthdate)
      return apiResponse(res, false, "MISSING_BIRTHDATE", "The 'Birth Date' field is required.", null, 400);

    if (!isAtLeast18(birthdate))
      return apiResponse(
        res,
        false,
        "UNDERAGE",
        "You must be at least 18 years old to register.",
        null,
        403
      );

    if (!password)
      return apiResponse(res, false, "MISSING_PASSWORD", "The 'Password' field is required.", null, 400);
    if (!confirmPassword)
      return apiResponse(res, false, "MISSING_CONFIRM_PASSWORD", "The 'Confirm Password' field is required.", null, 400);
    if (password !== confirmPassword)
      return apiResponse(res, false, "PASSWORD_MISMATCH", "Passwords do not match.", null, 400);

    fullName = capitalizeFullName(fullName);

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists)
      return apiResponse(res, false, "EMAIL_EXISTS", "Email already in use.", null, 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      birthdate,
      password: hashedPassword,
    });

    return apiResponse(res, true, "USER_CREATED", "User created successfully.", {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      birthdate: user.birthdate,
    }, 201);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error creating user.", null, 500);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return apiResponse(res, false, "MISSING_EMAIL", "Email is required.", null, 400);
    if (!isValidEmail(email))
      return apiResponse(res, false, "INVALID_EMAIL", "Invalid email.", null, 400);
    if (!password)
      return apiResponse(res, false, "MISSING_PASSWORD", "Password is required.", null, 400);

    const user = await User.findOne({ where: { email } });
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return apiResponse(res, false, "INVALID_PASSWORD", "Incorrect password.", null, 401);

    const token = jwt.sign(
      { id: user.id, email: user.email, fullName: user.fullName, birthdate: user.birthdate },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    return apiResponse(res, true, "LOGIN_SUCCESS", "Login successful.", {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      birthdate: user.birthdate,
      token
    }, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Login error.", null, 500);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return apiResponse(res, false, "MISSING_EMAIL", "Email is required.", null, 400);
    if (!isValidEmail(email))
      return apiResponse(res, false, "INVALID_EMAIL", "Invalid email.", null, 400);

    const user = await User.findOne({ where: { email } });
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await sendResetEmail(user.email, resetToken);

    return apiResponse(res, true, "RESET_EMAIL_SENT", "Password reset email sent.", resetToken, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error sending reset email.", null, 500);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword)
      return apiResponse(res, false, "MISSING_FIELDS", "All fields are required.", null, 400);
    if (newPassword !== confirmPassword)
      return apiResponse(res, false, "PASSWORD_MISMATCH", "Passwords do not match.", null, 400);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return apiResponse(res, false, "INVALID_TOKEN", "Invalid or expired token.", null, 401);
    }

    const user = await User.findByPk(decoded.id);
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return apiResponse(res, true, "PASSWORD_RESET_SUCCESS", "Password reset successfully.", null, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error resetting password.", null, 500);
  }
};

exports.updateFullName = async (req, res) => {
  try {
    const { userId, newFullName } = req.body;

    if (!newFullName)
      return apiResponse(res, false, "MISSING_FULLNAME", "The 'Full Name' field is required.", null, 400);

    const user = await User.findByPk(userId);
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const formattedName = capitalizeFullName(newFullName);
    await user.update({ fullName: formattedName });

    const token = jwt.sign(
      { id: user.id, email: user.email, fullName: formattedName, birthdate: user.birthdate },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return apiResponse(res, true, "FULLNAME_UPDATED", "Full name updated successfully.", {
      fullName: formattedName,
      token
    }, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error updating full name.", null, 500);
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { userId, newEmail } = req.body;

    if (!newEmail)
      return apiResponse(res, false, "MISSING_EMAIL", "Email is required.", null, 400);
    if (!isValidEmail(newEmail))
      return apiResponse(res, false, "INVALID_EMAIL", "Invalid email.", null, 400);

    const user = await User.findByPk(userId);
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const emailExists = await User.findOne({
      where: { email: newEmail, id: { [Op.ne]: userId } }
    });
    if (emailExists)
      return apiResponse(res, false, "EMAIL_EXISTS", "Email already in use.", null, 409);

    await user.update({ email: newEmail });

    const token = jwt.sign(
      { id: user.id, email: newEmail, fullName: user.fullName, birthdate: user.birthdate },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return apiResponse(res, true, "EMAIL_UPDATED", "Email updated successfully.", {
      email: newEmail,
      token
    }, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error updating email.", null, 500);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword)
      return apiResponse(res, false, "MISSING_FIELDS", "All password fields are required.", null, 400);
    if (newPassword !== confirmPassword)
      return apiResponse(res, false, "PASSWORD_MISMATCH", "Passwords do not match.", null, 400);

    const user = await User.findByPk(userId);
    if (!user)
      return apiResponse(res, false, "USER_NOT_FOUND", "User not found.", null, 404);

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword)
      return apiResponse(res, false, "INVALID_CURRENT_PASSWORD", "Current password is incorrect.", null, 401);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    const token = jwt.sign(
      { id: user.id, email: user.email, fullName: user.fullName, birthdate: user.birthdate },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return apiResponse(res, true, "PASSWORD_UPDATED", "Password updated successfully.", { token }, 200);

  } catch (error) {
    console.error(error);
    return apiResponse(res, false, "SERVER_ERROR", "Error updating password.", null, 500);
  }
};

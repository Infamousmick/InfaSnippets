const express = require("express");
const auth = express.Router();

const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../../middlewares/validation/AuthValidation");
const authController = require("./Auth.controller");
const verifyToken = require("../../middlewares/auth/auth.middlewares");

auth.post(
  "/register",
  registerValidationRules,
  validate,
  authController.registerUser,
);
auth.post("/login", loginValidationRules, validate, authController.login);

auth.get("/me", verifyToken, authController.getMe);
module.exports = auth;

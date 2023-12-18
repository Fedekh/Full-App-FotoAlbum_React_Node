const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { checkSchema } = require("express-validator");
const userRegister = require("../validations/userRegister.js");
const { checkValidity } = require("../middleware/schemaValidator.js");
const userLogin = require("../validations/userLogin.js");
const checkUserRole = require("../middleware/authRoleHandler.js");

router.get("/user", authController.index);

router.post(
  "/register",
  checkSchema(userRegister),
  checkValidity,
  authController.register
);

router.post(
  "/login",
  checkSchema(userLogin),
  checkValidity,
  authController.login
);

router.post(
  "/changerole/:id",
  authController.changeRole
);

module.exports = router;

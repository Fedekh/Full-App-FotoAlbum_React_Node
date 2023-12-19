const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { checkSchema } = require("express-validator");
const userRegister = require("../validations/userRegister.js");
const { checkValidity } = require("../middleware/schemaValidator.js");
const userLogin = require("../validations/userLogin.js");
const checkUserRole = require("../middleware/authRoleHandler.js");
const authHandler = require("../middleware/authHandler.js");
const changeRole = require("../validations/changeRole");
const createRole = require("../validations/createRole");

router.get("/user", authController.index);
router.get("/getroles", authController.getAllRoles);

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
  authHandler,
  checkSchema(changeRole),
  checkValidity,
  checkUserRole(['superadmin']),
  authController.changeRole
);

router.post(
  "/createrole",
  authHandler,
  checkSchema(createRole),
  checkValidity,
  checkUserRole(['superadmin']),
  authController.createRole
);

module.exports = router;

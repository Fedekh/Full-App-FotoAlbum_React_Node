const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { checkSchema } = require("express-validator");
const { checkValidity } = require("../middleware/schemaValidator.js");
const authHandler = require("../middleware/authHandler.js");
const checkUserRole = require("../middleware/authRoleHandler.js");
const categoryCreate = require("../validations/categoryCreate");


router.get("/", categoryController.index);

router.get("/:id", categoryController.show);

router.post("/",
    authHandler,
    checkSchema(categoryCreate),
    checkValidity,
    checkUserRole(['admin', 'superadmin']),
    categoryController.store);

router.put("/:id",
    authHandler,
    checkSchema(categoryCreate),
    checkValidity,                                      //recupera JWT e USER
    checkUserRole(['admin', 'superadmin']),
    categoryController.update);

router.delete("/:id",
    authHandler,                                         //recupera JWT e USER
    checkUserRole(['admin', 'superadmin']),
    categoryController.destroy);

module.exports = router;

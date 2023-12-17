const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");


router.get("/", categoryController.index);

router.get("/:id", categoryController.show);

module.exports = router;

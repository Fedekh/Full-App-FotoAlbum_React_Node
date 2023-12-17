const express = require("express");
const path = require("path");
const router = express.Router();
const fotoController = require("../controllers/FotoController");
//const { body, checkSchema, query } = require("express-validator");
//const pizzaCreate = require("../validations/pizzaCreate");
//const { checkValidity } = require("../middlewares/schemaValidator");
//const authHandler = require("../middlewares/authHandler");
//const authRoleHandler = require("../middlewares/authRoleHandler");
const multer = require("multer");

//per ora salviamo i file frontend in public
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});


router.get('/', fotoController.index);


router.get('/:id', fotoController.show);


router.post('/', fotoController.store);


router.put('/:id', fotoController.update);


router.delete('/:id', fotoController.destroy);





module.exports = router;
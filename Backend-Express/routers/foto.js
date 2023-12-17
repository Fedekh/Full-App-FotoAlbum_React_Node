const express = require("express");
const path = require("path");
const router = express.Router();
const fotoController = require("../controllers/FotoController");
const { body, checkSchema, query } = require("express-validator");
const fotoCreate = require("../validations/fotoCreate");
const { checkValidity } = require("../middleware/schemaValidator.js");
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


router.post('/',
    // multer({ storage: storage }).single("image"),
    checkSchema(fotoCreate),
    checkValidity,
    fotoController.store);


router.put('/:id', fotoController.update);


router.delete('/:id', fotoController.destroy);





module.exports = router;
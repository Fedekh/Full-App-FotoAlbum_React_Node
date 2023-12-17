const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFound = require("../exceptions/NotFound");
const ValidationError = require("../exceptions/ValidationError");
const { validationResult } = require("express-validator");


async function index(req, res, next) {
    const total = await prisma.category.count();

    const data = await prisma.category.findMany();

    return res.json({
        total,
        data
    });
}

async function show(req, res, next) {
    const { id } = req.params;

    try {
        const data = await prisma.category.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                name: true,
            },
        });

        if (!data) return res.status(404).json({ message: "Categoria non trovata", status: 404 });

        res.json(data);
    } catch (error) {
        console.error(error);
        return next(new Error("Errore durante la ricerca della categoria"));
    }
}


// async function store(req, res, next) {
//     return console.log('regretg');
// }

// async function update(req, res, next) {

// }

// async function destroy(req, res, next) {

// }







module.exports = {
    index,
    show,
    // store,
    // update,
    // destroy,
};

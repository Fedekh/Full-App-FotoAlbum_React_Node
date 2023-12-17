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


async function store(req, res, next) {
    try {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            console.log("Errore di validazione:", validation.array());
            return res.status(422).json({ error: "Controllare i dati inseriti", details: validation.array() });
        }

        const userId = req.user.id;
        const datiInIngresso = { ...req.validatedData, userId };

        const newCategory = await prisma.category.create({
            data: datiInIngresso
        });

        return res.json(newCategory);
    } catch (error) {
        console.error("Errore durante la creazione della categoria:", error);
        return res.status(500).json({ error: "Errore durante la creazione della categoria", details: error.message });
    }
}


async function update(req, res, next) {
    return console.log('regretg');

}

async function destroy(req, res, next) {
    return console.log('regretg');

}







module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

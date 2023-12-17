const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFound = require("../exceptions/NotFound");
const ValidationError = require("../exceptions/ValidationError");
const { validationResult } = require("express-validator");


async function index(req, res, next) {
    // Permetto di filtrare per name, price, available
    try {
        const filters = req.query.filter;
        const queryFilter = {};
        const page = req.query.page || 1;
        const perPage = 20;

        // Se ho dei filtri e se questi contenono il campo name
        if (filters && filters.name) {
            queryFilter.name = {
                contains: filters.name,
            };
        }

        // Se ho dei filtri e se questi contenono il campo available
        if (filters && filters.available) {
            queryFilter.available = {
                equals: filters.available === "true" || filters.available === "1",
            };
        }

        const total = await prisma.foto.count({ where: queryFilter });

        const data = await prisma.foto.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            where: queryFilter,
        });

        return res.json({
            page,
            perPage,
            total,
            data
        });
    } catch (error) {
        // Gestione degli errori del server
        console.error("Errore durante la gestione della richiesta :", error);
        return res.status(500).json({ error: "Errore interno del server" });
    }
}


async function show(req, res, next) {
    const { id } = req.params;

    const data = await prisma.foto.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!data) return next(new NotFound("La foto indicata non è stata trovata."));

    return res.json(data);
}



async function store(req, res, next) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        console.log("Errore di validazione:", validation.array());
        return res.status(422).json({ error: "Controllare i dati inseriti", details: validation.array() });
    }

    const userId = req.user.id;
    const datiInIngresso = req.validatedData;
    const image = req.file;

    try {
        console.log("Dati in ingresso:", datiInIngresso);

        const query = {
            name: datiInIngresso.name,
            description: datiInIngresso.description,
            visible: datiInIngresso.visible,
            image: image ? image.filename : 'percorso_o_URL_dell_immagine_di_default.jpg',
            userId: userId
        };

        const { categories } = req.body;

        if (categories) {
            const categoryIds = categories.split(',').map((idCategory) => +idCategory.trim());

            query.categories = {
                connect: categoryIds.map((categoryId) => ({
                    id: categoryId
                }))
            };
        }



        const newFoto = await prisma.foto.create({
            data: query,
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return res.json(newFoto);

    } catch (error) {
        console.error("Errore durante la creazione della foto:", error);
        return res.status(500).json({ error: "Errore durante la creazione della foto", details: error.message });
    }
}


async function update(req, res, next) {

}


async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        const data = await prisma.foto.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!data) {
            const notFound = new NotFound("La foto indicata non è stata trovata.");
            res.status(notFound.status).json(notFound.resp());

        }

        await prisma.foto.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.json({ message: `${data.name} è stato eliminato con successo` });
    } catch (error) {
        next(error);
    }
}






module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

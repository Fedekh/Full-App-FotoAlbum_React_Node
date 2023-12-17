const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFound = require("../exceptions/NotFound");
const ValidationError = require("../exceptions/ValidationError");
const { validationResult } = require("express-validator");
const AuthError = require("../exceptions/AuthError");


async function index(req, res, next) {
    try {
        const filters = req.query;
        const queryFilter = {};
        const page = req.query.page || 1;
        const perPage = 20;

        console.log(filters);
        if (filters && filters.name) {
            queryFilter.name = {
                contains: filters.name,
            };
        }

        if (filters && filters.visible) {
            queryFilter.visible = {
                equals: filters.visible === "true" || filters.visible === "1",
            };
        }

        if (filters && filters.categories) {
            const categoryIds = filters.categories.split(',').map(id => parseInt(id.trim()));

            queryFilter.categories = {
                some: {
                    id: {
                        in: categoryIds
                    }
                }
            };
        }

        const total = await prisma.foto.count({ where: queryFilter });

        const data = await prisma.foto.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            where: queryFilter,
            include: {
                categories: true,
            },
        });

        return res.json({
            page,
            perPage,
            total,
            data
        });

    } catch (error) {
        console.error("Errore durante la gestione della richiesta:", error);
        return res.status(500).json({ error: "Errore interno del server", details: error.message });
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
    const image = req.file;
    const datiInIngresso = { ...req.validatedData, image: image.filename, userId };

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

        if (data.userId !== req.user.id) {
            const authError = new AuthError("Accesso non autorizzato", 403);
            res.status(authError.status).json(authError.resp());
        }

        const file = req.file;
        const datiInIngresso = req.validatedData;
        let imageToUpdate;

        if (file) {
            imageToUpdate = file.filename;
        } else {
            // Se non è stato caricato un nuovo file, mantieni l'immagine esistente
            imageToUpdate = datiInIngresso.image || 'placeholder';
        }

        const fotoUpdate = await prisma.foto.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name: datiInIngresso.name,
                description: datiInIngresso.description,
                visible: datiInIngresso.visible,
                image: imageToUpdate,
                categories: {
                    connect: datiInIngresso.categories?.map((idCategory) => ({
                        id: +idCategory
                    }))
                }
            }
        });
        return res.json({ message: `Aggiornamento di ${data.name} completato con successo` });

    } catch (error) {
        next("Qualcosa è andato storto durante l'aggiornamento");
    }
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

        if (data.userId === req.user.id) {
            await prisma.foto.delete({
                where: {
                    id: parseInt(id),
                },
            });

            return res.json({ message: `${data.name} è stato eliminato con successo` });
        } else {
            const authError = new AuthError("Accesso non autorizzato", 403);
            res.status(authError.status).json(authError.resp());
        }

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

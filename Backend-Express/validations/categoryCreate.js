const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
    name: {
        in: ["body"],
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new Error('Il campo name è obbligatorio.');
                }

                // Verifica l'unicità del nome nel database
                const existingCategory = await prisma.category.findUnique({
                    where: {
                        name: value
                    }
                });

                if (existingCategory) {
                    throw new Error('Esiste gia uan categoria in DB cone questo nome.');
                }

                return true;
            },
        },
        isLength: {
            options: {
                min: 1,
            },
        },
    },
};

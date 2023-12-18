const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Il campo 'name' deve essere una stringa.",
        },
        notEmpty: {
            errorMessage: "Il campo 'name' non può essere vuoto.",
        },
        custom: {
            options: async (value, { req }) => {
                const existingRole = await prisma.role.findFirst({
                    where: { name: value },
                });

                if (existingRole) {
                    throw new Error("Questo ruolo esiste già.");
                }

                return true;
            },
        },
    },
};

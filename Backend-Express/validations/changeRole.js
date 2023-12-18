/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
    // Validazione per l'ID nel parametro dell'URL
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "L'ID deve essere un numero intero valido.",
        },
        toInt: true,
    },

    // Validazione per l'ID del ruolo nel corpo della richiesta
    id: {
        in: ["body"],
        isInt: {
            errorMessage: "L'ID del ruolo deve essere un numero intero valido.",
        },
        toInt: true,
    },
};
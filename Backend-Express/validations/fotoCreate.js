/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
    visible: {
        in: ["body"],
        isBoolean: true,
        optional: true,
        toBoolean: true,
    },
    name: {
        in: ["body"],
        custom: {
            options: (value) => {
                if (!value) {
                    throw new Error('Il campo name è obbligatorio.');
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
    category: {
        in: ["body"],
        optional: true,
    },
    image: {
        in: ["body"],
        optional: true,
    },
    description: {
        in: ["body"],
        optional: true,
    }
};

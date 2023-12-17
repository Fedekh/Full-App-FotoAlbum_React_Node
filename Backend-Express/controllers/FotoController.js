const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFound = require("../exceptions/NotFound");
const ValidationError = require("../exceptions/ValidationError");
const { validationResult } = require("express-validator");


async function index(req, res, next) {
    // Permetto di filtrare per name, price, available
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

    const total = await prisma.pizza.count({ where: queryFilter });

    const data = await prisma.pizza.findMany({
        skip: (page - 1) * perPage,
        // elementi per pagina
        take: perPage,
        where: queryFilter,
    });

    return res.json({
        data,
        page,
        perPage,
        total,
    });
}

async function show(req, res, next) {

}

async function store(req, res, next) {

}

async function update(req, res, next) {

}

async function destroy(req, res, next) {

}







module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

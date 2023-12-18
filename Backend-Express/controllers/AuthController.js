const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const AuthError = require("../exceptions/AuthError");

async function index(req, res, next) {
  try {
    return res.json({
      total: await prisma.user.count(),
      data: await prisma.user.findMany(),
    });
  } catch (error) {
    console.error(error);
    return next(new Error("Errore durante il recupero degli utenti"));
  }
}

async function changeRole(req, res, next) {
    try {
        const userId = +req.params.id;
        const newRole = req.body.role;
        console.log(newRole);
        
         // Verifica se userId è un numero valido
         if (isNaN(userId) || userId <= 0) throw new AuthError(`ID non valido`);

        // Aggiorna il ruolo dell'utente nel database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });

        // Restituisci i dettagli dell'utente aggiornato
        res.json({ userToUpdate: updatedUser });
    } catch (error) {
        console.error("Error in changing user role:", error.message);
        res.status(500).json({ error: "Error in changing user role", details: error.message });
    }
}


async function register(req, res, next) {
  /**
     Estraggo i dati validati dal middleware checkValidity
    scartando qualsiasi altra chiave non prevista 
    */
  try {
    const sanitizedData = matchedData(req);
    sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...sanitizedData,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "10000000h",
    });

    res.json({
      user,
      token,
      scadenza: new Date(jsonwebtoken.decode(token).exp * 1000).toISOString(),
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new AuthError(`Utente con email ${email} non trovato`);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new AuthError("Password errata");

    // Rigenero il token JWT
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });

    // Rimuovo informazioni sensibili dall'oggetto utente
    const sanitizedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.json({
      user: sanitizedUser,
      token,
      scadenza: new Date(jsonwebtoken.decode(token).exp * 1000).toISOString(),
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ error: "Autenticazione fallita" });
  }
}

async function me(req, res, next) {
  try {
    // Estrai l'ID dell'utente dalla richiesta
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new AuthError(`Utente con email ${email} non trovato`);

    // rimuovo la password dall'oggetto user
    delete user.password;

    res.json({ user });
  } catch (error) {
    console.error("Errore durante la richiesta dell'utente:", error);
    next(new AuthError("Errore durante la richiesta dell'utente"));
  }
}
/**può essere utilizzato, ad esempio, quando un utente autenticato desidera visualizzare o aggiornare il proprio profilo.
 *  Invece di richiedere esplicitamente l'ID dell'utente dalla richiesta, puoi semplicemente utilizzare il token JWT per identificare l'utente corrente. */

module.exports = {
  index,
  register,
  login,
  changeRole,
  me,
};

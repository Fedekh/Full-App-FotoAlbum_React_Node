const AuthError = require("../exceptions/AuthError");
const jsonwebtoken = require("jsonwebtoken");

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;

        if (!bearer || !bearer.startsWith("Bearer ")) {
            throw new AuthError("Bearer token mancante o malformato");
        }

        // Estraggo il token
        const token = bearer.split(" ")[1];

        /*
        Verificare che il token sia valido.
        Il verify da solo lancia degli errori in caso di token non valido o scaduto
        Estrarre i dati dell'utente dal token. Il verify ritorna il payload del token, quindi l'utente
         */
        const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        // Passare i dati dell'utente alla req in modo che possiamo accedervi nei controller
        req["user"] = user;

        // Invocare next()
        next();
    } catch (error) {
        // Gestire l'errore in modo appropriato
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            return res.status(401).json({ error: "Token scaduto" });
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            return res.status(401).json({ error: "Token non valido" });
        } else {
            return res.status(500).json({ error: "Errore durante l'autenticazione" });
        }
    }
}
/**si gestisce la protezione di alcune rotte CRUD tale per cui sono raggiungibli-eseguibili solo da admin */
const { validationResult, checkSchema, matchedData } = require("express-validator");

function checkValidity(req, res, next) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(422).json(validation.array());
    }

    // aggiungo al request una chiave contenente i dati validati
    req.validatedData = matchedData(req);

    next();
}

/**
 * Metodo che ritorna un array di middleware per la validazione dello schema
 * @param {*} schema
 * @returns
 */
module.exports = {
    function(schema) {
        return [
            // middleware che controlla lo schema
            checkSchema(schema),
            // middleware che controlla se ci sono errori di validazione
            checkValidity,
        ];
    },
};

module.exports.checkValidity = checkValidity;





/*
validationResult: Questa funzione viene utilizzata per estrarre il risultato della validazione da una richiesta Express. Dopo aver definito le regole di validazione con checkSchema o altre funzioni di express-validator, puoi chiamare validationResult(req) per ottenere un oggetto contenente i risultati della validazione.

checkSchema: Questa funzione ti consente di definire uno schema di validazione per i dati della richiesta. Puoi specificare regole di validazione per i vari campi della richiesta, come la presenza, il formato, ecc.

matchedData: Questa funzione restituisce solo i dati corrispondenti alle regole di validazione specificate. È utile quando vuoi ottenere solo i dati validati dalla richiesta. 
*/
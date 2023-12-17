const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 3000 || process.env.PORT;

const fotoRouter = require('./routers/foto');

// Registro il middleware per la gestione del CORS
app.use(cors({
    origin: ["http://localhost"],
}));

app.use(express.static("public")); //per gestire cartella public


/* Registro il middleware per il parsing del body Ogni volta che verranno inviati dei dati al server 
 con "Content-Type: application/json" verranno  automaticamente convertiti in un oggetto javascript
 accessibile tramite req.body registro il body-parser per "application/json"*/
app.use(express.json());

// registro il body-parser per "application/xwww-form-urlencoded"
app.use(express.urlencoded({ extended: true }));



app.use('/foto', fotoRouter);

// Registro il middleware per la gestione degli errori
// app.use(errorsHandlerMiddleware);

// Registro il middleware per la gestione delle rotte non trovate
// app.use(routeNotFoundMiddleware);


app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});
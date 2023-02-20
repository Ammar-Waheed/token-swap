import * as dotenv from 'dotenv'
import apiRouter from './api/routes/index.js';
import express from 'express';

dotenv.config()

const app = express();
const apiPort = process.env.API_PORT || 3000;

/**
 * Adding headers to our requests.
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      return res.status(200).json({});
    }
    next();
});

app.use("/api", apiRouter);
app.listen(apiPort);

app.use((req, res, next) => {
    const error = Error("Not found");
    res.statusCode = 404;
    res.send({ error: error.message });
});

console.log('SwapUp RESTful API server started on: ' + apiPort);
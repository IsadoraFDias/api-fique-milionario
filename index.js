import express, { json } from "express";
import controller from "../controller/index.js";
import cors from "cors";

const server = express();
server.use(cors({ origin: 'http://localhost:5500' })); 
server.use(json());
server.use('/', controller);

server.listen(8080, () => {
    console.log('Servidor está ouvindo na porta 8080');
});
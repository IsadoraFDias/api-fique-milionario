import express, { json } from "express";
import controller from "./surpresinha/controller.js";
import helmet from "helmet";
import cors from "cors";

const server = express();

server.use(helmet({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://fique-milionario-front.vercel.app"],
    }
}));

server.use(cors({ origin: 'https://fique-milionario-front.vercel.app' })); 
server.use(json());
server.use('/', controller);
server.use('/:loteria/:concursoinha', controller);

server.listen(8080, () => {
    console.log('Servidor está ouvindo na porta 8080');
});
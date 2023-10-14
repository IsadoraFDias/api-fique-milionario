import express from "express";
import surpresinha from "./surpresinha/controller.js";
import resultado from "./resultados/controller.js";
import helmet from "helmet";
import cors from "cors";

const server = express();

server.use(helmet({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://fique-milionario-remix.vercel.app"],
    }
}));
server.use(cors({ origin: 'https://fique-milionario-remix.vercel.app' }));
server.use(express.json());

server.use('/', surpresinha);
server.use('/resultado', resultado);

server.listen(8080, () => {
    console.log('Servidor está ouvindo na porta 8080');
});

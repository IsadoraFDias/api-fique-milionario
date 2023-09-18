import express, { json } from "express";
import cors from "cors";

const router = express.Router();

let numerosSorteados = [];

function sorteioPremiado(loteria) {
    let numeroMaximo;

    switch (loteria) {
        case 1:
            numeroMaximo = 60;
            break;
        case 2:
            numeroMaximo = 80;
            break;
        case 3:
            numeroMaximo = 25;
            break;
        default:
            throw new Error("Loteria inválida");
    }

    while (
        numerosSorteados.length < (loteria === 1 ? 6 : loteria === 2 ? 5 : 15)
    ) {
        const numero = Math.floor(Math.random() * numeroMaximo) + 1;
        if (!numerosSorteados.includes(numero)) {
            numerosSorteados.push(numero);
        }
    }

    return numerosSorteados;
}

router.post("/", (req, res) => {
    const { loteria } = req.body;
    try {
        if (loteria >= 1 && loteria < 4) {
            sorteioPremiado(loteria);
            const numerosSorteados2 = JSON.parse(JSON.stringify(numerosSorteados));
            res.status(200).json(numerosSorteados2);
        } else {
            res.status(400).send("Loteria inválida");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", (req, res) => {
    const numerosSorteados2 = JSON.parse(JSON.stringify(numerosSorteados));
    res.send(numerosSorteados2);
});

router.delete("/", (req, res) => {
    numerosSorteados = [];
    res.send("Números sorteados apagados");
});

const server = express();
const port = process.env.PORT || 8080;
server.use(cors({ origin: "https://fique-milionario-front.vercel.app/" }));
server.use(json());
server.listen(port, () => {
    console.log("Servidor está ouvindo na porta 8080");
});
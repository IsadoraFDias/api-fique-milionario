import express from "express";

const surpresinha = express.Router();

let numerosSorteados = [];
let numeroMaximo;
let quantidadeNumerosSorteados;

function sorteioPremiado(loteria) {

    switch (loteria) {
        case 1:
            numeroMaximo = 60;
            quantidadeNumerosSorteados = 6;
            break;
        case 2:
            numeroMaximo = 80;
            quantidadeNumerosSorteados = 5;
            break;
        case 3:
            numeroMaximo = 25;
            quantidadeNumerosSorteados = 15;
            break;
        default:
            throw new Error("Loteria inválida");
    }


    while (numerosSorteados.length < quantidadeNumerosSorteados) {
        const numero = Math.floor(Math.random() * numeroMaximo) + 1;
        if (!numerosSorteados.includes(numero)) {
            numerosSorteados.push(numero);
        }
    }
    numerosSorteados.sort((a, b) => a - b);

    return numerosSorteados;
}




surpresinha.post("/", (req, res) => {
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

surpresinha.get("/", (req, res) => {
    const numerosSorteados2 = JSON.parse(JSON.stringify(numerosSorteados));
    res.send(numerosSorteados2);
});

surpresinha.delete("/", (req, res) => {
    numerosSorteados = [];
    numeroMaximo = 0;
    quantidadeNumerosSorteados  = 0;
    res.send("Números sorteados apagados");
});

export default surpresinha;
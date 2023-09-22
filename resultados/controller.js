import express from "express";
import axios from "axios";

const resultado = express.Router();

const apiResultado = 'https://loteriascaixa-api.herokuapp.com/api/{loteria}/{concurso}';

async function getResultado(loteria, concurso) {
    const response = await axios.get(apiResultado.replace('{loteria}', loteria).replace('{concurso}', concurso));
    const resultado = response.data;
    return resultado;
}

resultado.post("/:loteria/:concurso", (req, res) => {
    const { loteria } = req.body;
    try {
        if (loteria >= 1 && loteria < 4) {
            res.status(200).json(numerosSorteados2);
        } else {
            res.status(400).send("Loteria inválida");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

resultado.get("/:loteria/:concurso", (req, res) => {
    const { loteria, concurso } = req.body;
    res.send(getResultado(loteria, concurso));
});

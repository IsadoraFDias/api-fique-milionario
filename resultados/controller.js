import express from "express";
import axios from "axios";

const resultado = express.Router();


async function getResultado(loteria, concurso) {
    const apiResultado = `https://loteriascaixa-api.herokuapp.com/api/${loteria}/${concurso}`;
    try {
        const response = await axios.get(apiResultado);
        const resultado = response.data;
        return resultado;
    } catch (error) {
        throw new Error("Erro ao obter o resultado da API");
    }
}

resultado.post("/:loteria/:concurso", async (req, res) => {
    const { loteria, concurso } = req.params;
    try {
        const resultadoData = await getResultado(loteria, concurso);
        res.status(200).json(resultadoData.dezenas);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

resultado.get("/:loteria/:concurso", async (req, res) => {
    const { loteria, concurso } = req.params;
    try {

            const resultadoData = await getResultado(loteria, concurso);
            res.status(200).json(resultadoData);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
 

export default resultado;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { CalculadorTarifa, Tarifa } = require('./functions/functions');
const tarifas = [
    new Tarifa('011', '016', 1.90),
    new Tarifa('016', '011', 2.90),
    new Tarifa('011', '017', 1.70),
    new Tarifa('017', '011', 2.70),
    new Tarifa('011', '018', 0.90),
    new Tarifa('018', '011', 1.90)
];

// EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.get("/",(req, res) => {
    res.render("page");   
});

app.post("/calculateRate",(req,res) => {
    const { origem, destino, tempo_ligacao, plano } = req.body;
    if (!origem || !destino || !tempo_ligacao || !plano) {
        return res.status(400).send({success: false, error: "Por favor, preencha todos os campos obrigatórios.", code:1001});
    }
    if(origem == destino){
        return res.status(400).send({success: false, error: "O valor do campo DDD de Origem não pode ser igual ao DDD de Destino.", code:1002});
    }
    if(tempo_ligacao.length > 3){
        return res.status(400).send({success: false, error: "O valor campo Tempo da ligação deve ser igual ou menor a 999.", code:1003});
    }
    const calculador = new CalculadorTarifa(tarifas, plano);
    const result = calculador.calcular(origem, destino, tempo_ligacao);
    return res.status(200).send({success: true, result: result, plano: plano});
});

module.exports = app
const listaDeInstrutores = require('./bancodedados.json')
function allQuery(req, res){
    res.json(listaDeInstrutores);
}

let proximoId = 4;

function singleQuery(req, res){
    const instrutor = listaDeInstrutores.find(
        (instrutor) => instrutor.id == Number(req.params.idConsultado)
    );
    res.json(instrutor);
}

function createData(req, res){
    for(i=0; i< req.body.length; i++){
        const novoInstrutor = {
            id: proximoId,
            nome: req.body[i].nome,
            idade: req.body[i].idade,
            areaDeAtuacao: req.body[i].areaDeAtuacao
        };

        listaDeInstrutores.push(novoInstrutor);
        proximoId += 1;
    }
    res.json(listaDeInstrutores);
}

function modifyData(req, res){
    const instrutor = listaDeInstrutores.find((instrutor)=> instrutor.id == Number(req.params.idConsultado));

    if(req.body.nome !== undefined){
        instrutor.nome = req.body.nome
    };

    if(req.body.idade !== undefined){
        instrutor.idade = req.body.idade
    };

    if(req.body.areaDeAtuacao !== undefined){
        instrutor.areaDeAtuacao = req.body.areaDeAtuacao
    };

    res.json(instrutor);
}

function createOrModifyData(req, res){
    const instrutor = listaDeInstrutores.find((instrutor)=> instrutor.id == Number(req.params.idConsultado));
    
    if(instrutor){
        instrutor.id = req.body.id;
        instrutor.nome = req.body.nome;
        instrutor.idade = req.body.idade;
        instrutor.areaDeAtuacao = req.body.areaDeAtuacao;

        res.json(instrutor);
    }else{
        const novoInstrutor = {
            id: proximoId,
            nome: req.body.nome,
            idade: req.body.idade,
            areaDeAtuacao: req.body.areaDeAtuacao
        };

        listaDeInstrutores.push(novoInstrutor);

        res.json(novoInstrutor);

        proximoId += 1;
    }
}

function deleteData(req, res){
    const instrutor = listaDeInstrutores.find((instrutor)=> instrutor.id == Number(req.params.idConsultado))

    listaDeInstrutores.splice(listaDeInstrutores.indexOf(instrutor), 1)
    
    res.json(instrutor)
}

module.exports = {allQuery, singleQuery, createData, modifyData, createOrModifyData, deleteData}
const instructorList = require('./bancodedados.json')

let nextId = 4;
let areaDeAtuacaoValidas = ["logica", "ui/ux", "front-end", "back-end", "full-stack", "mobile", "soft-skills"];

function validateInstructor(instructor){
    if(!instructor.nome || typeof instructor.nome !== "string"){
        return'O campo "nome" deve ser preenchido corretamente';
    }

    if(!instructor.idade || typeof instructor.idade != "number" || instructor.idade < 18){
        return'O campo "idade" deve ser preenchido corretamente';
    }

    if(!instructor.areaDeAtuacao || typeof instructor.areaDeAtuacao != "string" || !areaDeAtuacaoValidas.includes(instructor.areaDeAtuacao.toLowerCase())){
        return'O campo "área de atuação" deve ser preenchido corretamente';
    } 
}

// modifc

function allQuery(req, res){
    res.json(instructorList);
}

function singleQuery(req, res){
    const instructor = instructorList.find(
        (instructor) => instructor.id == Number(req.params.idConsultado)
    );

    if(!instructor){
        res.status(404);
        res.json({ error: 'Instrutor ' + req.params.idConsultado + ' não foi encontrado'})
        return
    }

    res.json(instructor);
}

function createData(req, res){
    const error = validateInstructor(req.body)

    if(error){
        res.status(400);
        res.json(error);
        return;
    }

    const newInstructor = {
        id: nextId,
        nome: req.body.nome,
        idade: req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao
    };

    instructorList.push(newInstructor);
    nextId += 1;

    res.json(instructorList);
}

function modifyData(req, res){
    const instrutor = instructorList.find((instrutor)=> instrutor.id == Number(req.params.idConsultado));

    if(!instrutor){
        res.status(404);
        res.json({ error: 'Instrutor ' + req.params.idConsultado + ' não foi encontrado'})
        return
    }

    const error = validateInstructor({nome: req.body.nome ?? instrutor.nome, idade: req.body.idade ?? instrutor.idade, areaDeAtuacao: req.body.areaDeAtuacao ?? instrutor.areaDeAtuacao})

    if(error){
        res.status(400)
        res.json({error})
        return
    }

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
    const instrutor = instructorList.find((instrutor)=> instrutor.id == Number(req.params.idConsultado));
    
    if(instrutor){
        const error = validateInstructor({nome: req.body.nome ?? instrutor.nome, idade: req.body.idade ?? instrutor.idade, areaDeAtuacao: req.body.areaDeAtuacao})
        
        if(error){
            res.status(400)
            res.json({error})
            return
        }

        instrutor.id = req.body.id;
        instrutor.nome = req.body.nome;
        instrutor.idade = req.body.idade;
        instrutor.areaDeAtuacao = req.body.areaDeAtuacao;

        res.json(instrutor);
    }else{
        const newInstructor = {
            id: nextId,
            nome: req.body.nome,
            idade: req.body.idade,
            areaDeAtuacao: req.body.areaDeAtuacao
        };
        instructorList.push(newInstructor);


        res.json(newInstructor);

        nextId += 1;
    }
}

function deleteData(req, res){
    const instrutor = instructorList.find((instrutor)=> instrutor.id === Number(req.params.idConsultado))
    
    if(instrutor) instructorList.splice(instructorList.indexOf(instrutor), 1);
    
    res.json(instrutor)
}

module.exports = {allQuery, singleQuery, createData, modifyData, createOrModifyData, deleteData}
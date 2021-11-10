const express = require('express')
const roteador = express()
const { allQuery, singleQuery, createData, modifyData, createOrModifyData, deleteData
} = require('./controladores')

roteador.get("/instrutores", allQuery);

roteador.get("/instrutores/:idConsultado", singleQuery)

roteador.post("/instrutores", createData);

roteador.patch("/instrutores/:idConsultado", modifyData)

roteador.put("/instrutores/:idConsultado", createOrModifyData)

roteador.delete("/instrutores/:idConsultado", deleteData)

module.exports = roteador;
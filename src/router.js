const express = require('express')
const router = express()
const { allQuery, singleQuery, createData, modifyData, createOrModifyData, deleteData
} = require('./controller')

router.get("/instrutores", allQuery);

router.get("/instrutores/:idConsultado", singleQuery)

router.post("/instrutores", createData);

router.patch("/instrutores/:idConsultado", modifyData)

router.put("/instrutores/:idConsultado", createOrModifyData)

router.delete("/instrutores/:idConsultado", deleteData)

module.exports = router;
const express = require('express');
const roteador = require('./src/roteador')
const app = express();
app.use(express.json());
app.use(roteador)




app.listen(8001)
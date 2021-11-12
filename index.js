const express = require('express');
const app = express();
const router = require('./src/router')
const {confereSenha} = require('./src/middleware')

app.use(express.json());

app.use(confereSenha);

app.use(router)

app.listen(8001)
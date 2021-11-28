require('dotenv').config();
const express = require('express');
const rotas = require('./rotas')
const app = express();
const knex = require('./database/conexao');
const yup = require('yup');

app.use(express.json());
app.use(rotas);


app.listen(process.env.PORT);
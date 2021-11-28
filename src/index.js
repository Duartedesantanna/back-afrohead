require('dotenv').config();
const express = require('express');
const rotas = require('./rotas')
const app = express();
const knex = require('./database/conexao');
const yup = require('yup');
const cors = require('cors');


app.use(express.json({ limit: '5mb'}));

app.use(cors());

app.use(rotas);

//app.listen(3000);
app.listen(process.env.PORT || 3000);
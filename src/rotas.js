const express = require('express');
const empresas =  require('./controller/empresas');
const contatos =  require('./controller/contatos');
const avaliacoes =  require('./controller/avaliacoes');
const uploads = require('./controller/uploads');

const rotas = express();

//teste
rotas.get('/', function (req, res) {
    res.send("Servidor OK!")
})

rotas.post('/empresa', empresas.cadastrarEmpresa);
rotas.get('/empresa/:id', empresas.exibirEmpresa);
rotas.get('/empresas/:id', empresas.listarEmpresas);

rotas.post('/avaliacoes', avaliacoes.cadastrarAvaliacao);
rotas.get('/avaliacoes', avaliacoes.exibirAvaliacao);

rotas.post('/contatos', contatos.cadastrarContato);

rotas.post('/upload', uploads.upload);



module.exports = rotas;
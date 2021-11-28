const cadastroAvaliacaoSchema = require('../validation/cadastroAvaliacaoSchema')
const knex = require('../database/conexao')

const cadastrarAvaliacao = async (req, res) => {
    
    const {nome_usuario, email, avaliacao, descritivo, id_empresa} = req.body;
    
    const dadosNovaAvaliacao = {
        nome_usuario, email, avaliacao, descritivo, id_empresa
    };
    
    try {
        await cadastroAvaliacaoSchema.validate(req.body);
        
        consultaEmpresa = await knex('empresas').where('id', id_empresa).first();

        if(!consultaEmpresa){
            return res.status(400).json({ mensagem: 'Não foi possível registrar sua avaliação pois a empresa não existe mais!' })
        }

        const avaliacaoCadastrada = await knex('avaliacoes').insert(dadosNovaAvaliacao);
        
        console.log(avaliacaoCadastrada);
        
        if (!avaliacaoCadastrada) {
            return res.status(400).json({ mensagem: 'Não foi possível registrar sua avaliação!' })
        }
    
        return res.status(200).json({ mensagem: 'Avaliação registrada com sucesso!' })
    
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
    
}

const exibirAvaliacao = async (req, res) => {
    
    const {id_empresa} = req.body;
    
    try {
        const avaliacoes = await knex('avaliacoes').where('id_empresa', id_empresa);
    
        if (avaliacoes.length <= 0) {
            return res.status(400).json({ mensagem: 'Não foi encontrada nenhuma avaliação!' })
        }
    
        return res.status(200).json(avaliacoes)
    
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
    
}

module.exports = {
    cadastrarAvaliacao, exibirAvaliacao
}
const cadastroEmpresaSchema = require('../validation/cadastroEmpresaSchema')
const knex = require('../database/conexao')

const cadastrarEmpresa = async (req, res) => {

    const {nome_usuario, sobrenome_usuario, email, nome_empresa, telefone, descricao, cep, logradouro, complemento, bairro, cidade, estado, url_logomarca, url_facebook, url_instagam} = req.body;

    const dadosNovaEmpresa = {
        nome_usuario, sobrenome_usuario, email, nome_empresa, telefone, descricao, cep, logradouro, complemento, bairro, cidade, estado, url_logomarca, url_facebook, url_instagam
    };

    try {
        await cadastroEmpresaSchema.validate(req.body);

        const consultaEmpresaExistente = await knex('empresas').where('nome_empresa', nome_empresa);

        if (consultaEmpresaExistente.length > 0) {
            return res.status(400).json({ mensagem: 'Empresa já possui cadastro na plataforma.' })
        }

        const empresaCadastrada = await knex('empresas').insert(dadosNovaEmpresa);

        if (!empresaCadastrada) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar a empresa!' })
        }

        return res.status(200).json({ mensagem: 'Cadastro concluído com sucesso!' })


    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const exibirEmpresa = async (req, res) => {

    const {id} = req.params;

    try {

        let consultaEmpresa = await knex('empresas').where('id', id).first();
        if (!consultaEmpresa) {
            return res.status(404).json({ mensagem: 'Não possui empresa cadastrada com esse ID!'})
        }

        const existeavaliacao = await knex('avaliacoes').where('id_empresa', id);

        if(existeavaliacao.length > 0){
            const qntAvaliacoes = await knex('avaliacoes').where('id_empresa', id).sum('avaliacao').count('avaliacao').first();

            const { sum, count} = qntAvaliacoes;

            const mediaAvaliacao = sum/count;

            const resultado = {
                totalAvaliacoes: count,
                Nota: mediaAvaliacao
            }

            consultaEmpresa = {...consultaEmpresa, ...resultado};
        }
        else{
            const resultado = {
                totalAvaliacoes: 0,
                Nota: 0
            }
            consultaEmpresa = {...consultaEmpresa, ...resultado};
        }


        return res.status(200).json(consultaEmpresa)

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const listarEmpresas = async (req, res) => {

    const {id} = req.params;

    try {
        let consultaEmpresas = await knex('empresas').where('bairro', id);
        const qntResultados = await knex('empresas').where('bairro', id).count('id').first();


        if(consultaEmpresas.length <= 0){
            return res.status(404).json({ mensagem: 'Não entrou nenhum resultado para a busca!'})
        }

        for(var i=0; i<qntResultados.count; i++){
            console.log(consultaEmpresas[i].id);

            const existeavaliacao = await knex('avaliacoes').where('id_empresa', consultaEmpresas[i].id);

            if(existeavaliacao.length > 0){
                const qntAvaliacoes = await knex('avaliacoes').where('id_empresa', id).sum('avaliacao').count('avaliacao').first();

                const { sum, count} = qntAvaliacoes;

                const mediaAvaliacao = sum/count;

                const resultado = {
                    totalAvaliacoes: count,
                    Nota: mediaAvaliacao
                }

                consultaEmpresas[i] = {...consultaEmpresas[i], ...resultado};
            }
            else{
                const resultado = {
                    totalAvaliacoes: 0,
                    Nota: 0
                }
                consultaEmpresas[i] = {...consultaEmpresas[i], ...resultado};
        }

        }
        return res.status(200).json(consultaEmpresas)

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarEmpresa, exibirEmpresa, listarEmpresas
}
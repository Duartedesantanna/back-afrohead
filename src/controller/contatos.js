const cadastroContatoSchema = require('../validation/cadastroContatoSchema')
const knex = require('../database/conexao')
const nodemailer = require('../nodemailer')

const cadastrarContato = async (req, res) => {
    
    const {nome_usuario, email, telefone, mensagem} = req.body;
    
    const dadosNovoContato = {
        nome_usuario, email, telefone, mensagem
    };
    
    try {
        await cadastroContatoSchema.validate(req.body);
    
        const contatoCadastrado = await knex('contatos').insert(dadosNovoContato);
    
        if (!contatoCadastrado) {
            return res.status(400).json({ mensagem: 'Não foi possível registrar seu contato!' })
        }

        //Envio do email

        const dadosEnvio = {
            from: `${nome_usuario} <${email}>`,
            to: '<contatos.afrohead@gmail.com>',
            subject: 'Mensagem de contato',
            text: mensagem
        }
        await nodemailer.sendMail(dadosEnvio);
    
        return res.status(200).json({ mensagem: 'Contato registrado com sucesso!' })
    
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
    
}

module.exports = {
    cadastrarContato
}
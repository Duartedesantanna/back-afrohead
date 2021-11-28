const yup = require('./yup');

const regexTelefone = RegExp(/^\d{9,}$/);

const cadastroClienteSchema = yup.object().shape({
  nome_usuario: yup
    .string()
    .required('Este campo deve ser preenchido'),
  email: yup
    .string()
    .email('O email precisa ter um formato válido.')
    .required('Este campo deve ser preenchido'),
  telefone: yup
    .string()
    .typeError('O telefone precisa ter um formato válido.')
    .matches(regexTelefone, 'O telefone precisa ter um formato válido.'),
  mensagem: yup.string()
});

module.exports = cadastroClienteSchema;
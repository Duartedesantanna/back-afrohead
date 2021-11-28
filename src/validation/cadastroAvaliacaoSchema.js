const yup = require('./yup');

const regexavaliacao = RegExp(/^\d{1}$/);

const cadastroClienteSchema = yup.object().shape({
  nome_usuario: yup
    .string()
    .required('Este campo deve ser preenchido'),
  email: yup
    .string()
    .email('O email precisa ter um formato válido.')
    .required('Este campo deve ser preenchido'),
  avaliacao: yup
    .string()
    .typeError('A avaliação precisa ter um formato válido.')
    .matches(regexavaliacao, 'A avaliação precisa ter 1 caractere numéricos.')
    .required('Este campo deve ser preenchido'),
  descritivo: yup.string()
});

module.exports = cadastroClienteSchema;
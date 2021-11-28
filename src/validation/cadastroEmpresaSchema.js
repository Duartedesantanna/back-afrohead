const yup = require('./yup');

const regexCep = RegExp(/^\d{8}$/);
const regexEstado = RegExp(/^\w{2}$/);
const regexTelefone = RegExp(/^\d{9,}$/);

const cadastroClienteSchema = yup.object().shape({
  nome_usuario: yup
    .string()
    .required('Este campo deve ser preenchido'),
  sobrenome_usuario: yup
    .string()
    .required('Este campo deve ser preenchido'),
  email: yup
    .string()
    .email('O email precisa ter um formato válido.')
    .required('Este campo deve ser preenchido'),
  nome_empresa: yup
    .string()
    .required('Este campo deve ser preenchido'),
  telefone: yup
    .string()
    .typeError('O telefone precisa ter um formato válido.')
    .matches(regexTelefone, 'O telefone precisa ter um formato válido.')
    .required('Este campo deve ser preenchido'),
  descricao: yup.string(),
  cep: yup
    .string()
    .typeError('O CEP precisa ter um formato válido.')
    .matches(regexCep, 'O CEP precisa ter 8 caracteres numéricos.'),
  logradouro: yup
    .string()
    .required('Este campo deve ser preenchido'),
  complemento: yup.string(),
  bairro: yup
    .string()
    .required('Este campo deve ser preenchido'),
  cidade: yup
    .string()
    .required('Este campo deve ser preenchido'),
  estado: yup
    .string()
    .typeError('O estado precisa ter um formato válido.')
    .matches(regexEstado, 'O estado precisa ter 2 letras apenas.')
    .required('Este campo deve ser preenchido'),
  url_logomarca: yup.string(),
  url_facebook: yup.string(),
  url_instagam: yup.string()
});

module.exports = cadastroClienteSchema;
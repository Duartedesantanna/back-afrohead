DROP TABLE IF EXISTS empresas CASCADE;

DROP TABLE IF EXISTS avaliacoes CASCADE;

DROP TABLE IF EXISTS contatos CASCADE;

CREATE TABLE empresas(
  id serial NOT NULL PRIMARY KEY,
  nome_usuario varchar(30) NOT NULL,
  sobrenome_usuario varchar(50) NOT NULL,
  email text NOT NULL,
  nome_empresa text NOT NULL UNIQUE,
  telefone varchar(11) NOT NULL,
  descricao text,
  cep varchar(8) NOT NULL,
  logradouro varchar(120) NOT NULL,
  complemento varchar(20),
  bairro varchar(40) NOT NULL,
  cidade varchar(50) NOT NULL,
  estado varchar(2) NOT NULL,
  url_logomarca text,
  url_facebook text,
  url_instagam text
);

CREATE TABLE avaliacoes(
  id serial NOT NULL PRIMARY KEY,
  nome_usuario varchar(30) NOT NULL,
  email text NOT NULL,
  avaliacao varchar(1) NOT NULL,
  descritivo text,
  id_empresa int
);

CREATE TABLE contatos(
  id serial NOT NULL PRIMARY KEY,
  nome_usuario varchar(30) NOT NULL,
  email text NOT NULL,
  telefone varchar(11),
  mensagem text NOT NULL
);
CREATE SCHEMA teste;

CREATE TABLE teste.loja (
	id serial4 NOT NULL,
	nome varchar NULL,
	horario_abertura varchar NULL,
	horario_fechamento varchar NULL
);

CREATE TABLE teste.pedido (
	id serial4 NOT NULL,
	data_inclusao timestamp NULL DEFAULT now(),
	usuario_id int4 NULL,
	total numeric(9, 2) NULL,
	endereco varchar(255) NULL,
	numero varchar(255) NULL,
	bairro varchar(255) NULL,
	cidade varchar(255) NULL,
	cep varchar(255) NULL,
	uf varchar(255) NULL
);

CREATE TABLE teste.pedido_produto (
	id serial4 NOT NULL,
	pedido_id int4 NULL,
	produto_id int4 NULL,
	quantidade numeric(9, 3) NULL,
	valor_unitario numeric(9, 2) NULL,
	total numeric(9, 2) NULL
);

CREATE TABLE teste.produto (
	id serial4 NOT NULL,
    nome varchar NOT NULL
	descricao varchar NULL,
	valor numeric(9, 2) NULL
);

CREATE TABLE teste.usuario (
	id serial4 NOT NULL,
	email varchar NULL,
    senha varchar NOT NULL
	nome varchar NULL,
	endereco varchar NULL,
	numero varchar NULL,
	bairro varchar NULL,
	cidade varchar NULL,
	cep varchar NULL,
	uf varchar NULL,
	complemento varchar NULL,
	ponto_referencia varchar NULL,
	telefone varchar NULL,
	funcionario bool NULL
);
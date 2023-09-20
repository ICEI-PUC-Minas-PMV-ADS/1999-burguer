CREATE SCHEMA teste;

CREATE TABLE teste.loja (
	id serial4 NOT NULL,
	nome varchar NOT NULL,
	horario_abertura varchar NULL,
	horario_fechamento varchar NULL,
	CONSTRAINT loja_pkey PRIMARY KEY (id)
);

CREATE TABLE teste.produto (
	id serial4 NOT NULL,
	descricao varchar NOT NULL,
	valor numeric(9, 2) NOT NULL,
	nome varchar NOT NULL,
    status bool NOT NULL,
	CONSTRAINT produto_pkey PRIMARY KEY (id)
);

CREATE TABLE teste.usuario (
	id serial4 NOT NULL,
	email varchar NOT NULL,
	nome varchar NOT NULL,
	endereco varchar NOT NULL,
	numero varchar NOT NULL,
	bairro varchar NOT NULL,
	cidade varchar NOT NULL,
	cep varchar NOT NULL,
	uf varchar NOT NULL,
	complemento varchar NULL,
	ponto_referencia varchar NULL,
	telefone varchar NOT NULL,
	funcionario bool NOT NULL,
	senha varchar NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
    CONSTRAINT usuario_un UNIQUE (email)
);

CREATE TABLE teste.pedido (
	id serial4 NOT NULL,
	data_inclusao timestamp NULL DEFAULT now(),
	usuario_id int4 NOT NULL,
	total numeric(9, 2) NOT NULL,
	endereco varchar(255) NOT NULL,
	numero varchar(255) NOT NULL,
	bairro varchar(255) NOT NULL,
	cidade varchar(255) NOT NULL,
	cep varchar(255) NOT NULL,
	uf varchar(255) NOT NULL,
    status bool NOT NULL,
	data_finalizacao timestamp NOT NULL,
	CONSTRAINT pedido_pkey PRIMARY KEY (id),
	CONSTRAINT pedido_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES teste.usuario(id)
);

CREATE TABLE teste.pedido_produto (
	id serial4 NOT NULL,
	pedido_id int4 NOT NULL,
	produto_id int4 NOT NULL,
	quantidade int4 NOT NULL,
	valor_unitario numeric(9, 2) NOT NULL,
	total numeric(9, 2) NOT NULL
);

INSERT INTO teste.loja (id, nome, horario_abertura, horario_fechamento)
VALUES (1, 'Loja Matriz', '18:00', '00:00');

INSERT INTO teste.usuario ( id, nome, email, senha )
VALUES (1, 'admin', 'admin@admin.com', '$2a$08$vxHO36vOo.aJ5J3dR.qA3O73/7cDIJQ7ZWlyhjMx/tvTV.EwFTmky');
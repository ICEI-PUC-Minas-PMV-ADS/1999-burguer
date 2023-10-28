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
);

CREATE TABLE teste.pedido (
    id serial4 NOT NULL,
    data_inclusao timestamp NOT NULL DEFAULT now(),
    usuario_id int4 NOT NULL,
    total numeric(9, 2) NOT NULL,
    endereco varchar(255) NOT NULL,
    numero varchar(255) NOT NULL,
    bairro varchar(255) NOT NULL,
    cidade varchar(255) NOT NULL,
    cep varchar(255) NOT NULL,
    uf varchar(255) NOT NULL,
    status int4 NOT NULL,
    data_finalizacao timestamp NULL,
    CONSTRAINT pedido_pkey PRIMARY KEY (id),
    CONSTRAINT pedido_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES teste.usuario(id)
);

CREATE TABLE teste.pedido_produto (
    id serial4 NOT NULL,
    pedido_id int4 NOT NULL,
    produto_id int4 NOT NULL,
    quantidade int4 NOT NULL,
    valor_unitario numeric(9, 2) NOT NULL,
    total numeric(9, 2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT pedido_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES teste.pedido(id),
    CONSTRAINT pedido_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES teste.produto(id)
);

CREATE TABLE teste.reset_code (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  reset_code CHAR(6) NOT NULL,
  requested_date TIMESTAMP NOT NULL,
  expiring_date TIMESTAMP NOT NULL,
  used bool NOT NULL
);


INSERT INTO teste.loja (id, nome, horario_abertura, horario_fechamento)
VALUES (1, 'Loja Matriz', '18:00', '00:00');

/*Usuarios teste*/

INSERT INTO teste.usuario ( id, email, senha, nome, endereco, numero, bairro, cidade, cep, uf, ponto_referencia, telefone, funcionario )
VALUES (1, 'admin@admin.com', '$2a$08$vxHO36vOo.aJ5J3dR.qA3O73/7cDIJQ7ZWlyhjMx/tvTV.EwFTmky', 'admin', 'Rua Nilza Brito', '51', 'vitória', 'Belo Horizonte', '31970755', 'MG', 'praça do ipê', '31988886666', false);

INSERT INTO teste.usuario ( id, email, senha, nome, endereco, numero, bairro, cidade, cep, uf, ponto_referencia, telefone, funcionario )
VALUES (2, 'user1@teste.com', 'wqakpoedjsdekpowdeaqskopewqadhiurtygeo', 'user1', 'Rua Nilza Brito', '51', 'vitória', 'Belo Horizonte', '31970755', 'MG', 'praça do ipê', '31988886666', false);

INSERT INTO teste.usuario ( id, email, senha, nome, endereco, numero, bairro, cidade, cep, uf, ponto_referencia, telefone, funcionario )
VALUES (3, 'user2@teste.com', 'rehtoiweurhtewrweryrtyjmghsjk', 'user2', 'Rua Nilza Brito', '51', 'vitória', 'Belo Horizonte', '31970755', 'MG', 'praça do ipê', '31988886666', false);


/*Produtos*/
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (1, 'carne, alface, tomate, ovo, pão, batata palha', 24.80, 'X-burger', true);
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (2, 'carne de frang, alface, tomate, ovo, pão, batata palha', 21.80, 'X-Frango', true);
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (3, 'carne de picanha, alface, tomate, ovo, pão, batata palha', 29.90, 'X-Picanha', true);
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (4, 'pão, ovo, presunto, mussarela', 10.00, 'Misto Quente', true);
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (5, 'queijo brie, alface, tomate, ovo, pão, batata palha', 24.80, 'X-queijo', true);
INSERT INTO teste.produto (id, descricao, valor, nome, status) VALUES (6, 'tofu, alface, tomate, pão vegano, batata palha', 35.00, 'X-vegano', true);


/*Pedidos*/

INSERT INTO teste.pedido (id, usuario_id, total, endereco, numero, bairro, cidade, cep, uf, status, data_finalizacao) VALUES (1, 3, 24.80, 'Rua nilza brito', '51', 'vitoria', 'belo horizonte', '31970755', 'MG', 0, TO_TIMESTAMP(1633530000));
INSERT INTO teste.pedido (id, usuario_id, total, endereco, numero, bairro, cidade, cep, uf, status, data_finalizacao) VALUES (2, 3, 40.90, 'Rua nilza brito', '51', 'vitoria', 'belo horizonte', '31970755', 'MG', 2, TO_TIMESTAMP(1633530000));
INSERT INTO teste.pedido (id, usuario_id, total, endereco, numero, bairro, cidade, cep, uf, status, data_finalizacao) VALUES (3, 2, 35.00, 'Rua nilza brito', '51', 'vitoria', 'belo horizonte', '31970755', 'MG', 1, TO_TIMESTAMP(1633530000));


/*Pedido Produto*/

INSERT INTO teste.pedido_produto (id, pedido_id, produto_id, quantidade, valor_unitario, total)
VALUES (1, 1, 2, 2, 21.80, 53.60);

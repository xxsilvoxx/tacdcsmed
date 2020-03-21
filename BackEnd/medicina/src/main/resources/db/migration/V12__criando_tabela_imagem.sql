 CREATE TABLE imagem (
	id_imagem BIGINT(20) PRIMARY KEY auto_increment,
    caminho TEXT,
    tipo VARCHAR(250),
    tamanho BIGINT(20)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 ALTER TABLE funcionario ADD id_imagem BIGINT(20);

 ALTER TABLE funcionario ADD CONSTRAINT fk_imagem FOREIGN KEY(id_imagem) REFERENCES imagem(id_imagem);
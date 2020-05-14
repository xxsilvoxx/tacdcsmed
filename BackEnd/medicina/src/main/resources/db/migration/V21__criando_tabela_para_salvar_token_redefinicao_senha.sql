CREATE TABLE password_reset_token (
	id BIGINT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario BIGINT(20),
    token TEXT,
    data_expira DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES funcionario (id_funcionario)
);
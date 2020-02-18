CREATE TABLE ubs (
	id_ubs BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(250) NOT NULL,
	descricao varchar(150)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE medicamento (
	id_medicamento BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(250) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE medicamento_pessoa (
	id_medicamento_pessoa BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
	id_pessoa BIGINT(20) NOT NULL,
	id_medicamento BIGINT(20) NOT NULL,
	horarios VARCHAR(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE visita (
	id_visita BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
	id_pessoa BIGINT(20) NOT NULL,
	id_funcionario BIGINT(20) NOT NULL,
	data_visita TIMESTAMP,
	anotacoes VARCHAR(100),
	comparecer_ubs BOOLEAN,
	data_comparecimento TIMESTAMP,
	descricao_comparecimento VARCHAR(150)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE funcao (
	id_funcao BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(250) NOT NULL,
	descricao varchar(150)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `medicamento_pessoa` ADD CONSTRAINT  FK_ID_DA_medPessoa FOREIGN KEY(id_pessoa) REFERENCES pessoa(id_pessoa);
ALTER TABLE `medicamento_pessoa` ADD CONSTRAINT  FK_ID_DA_medicamento FOREIGN KEY(id_medicamento) REFERENCES medicamento(id_medicamento);
ALTER TABLE `visita` ADD CONSTRAINT  FK_ID_DA_visitaPessoa FOREIGN KEY(id_pessoa) REFERENCES pessoa(id_pessoa);
ALTER TABLE `visita` ADD CONSTRAINT  FK_ID_DA_visitaFunc FOREIGN KEY(id_funcionario) REFERENCES funcionario(id_funcionario);
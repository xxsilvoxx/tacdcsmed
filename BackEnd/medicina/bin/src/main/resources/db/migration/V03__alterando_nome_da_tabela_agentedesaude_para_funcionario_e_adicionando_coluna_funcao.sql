RENAME TABLE agente_de_saude TO funcionario;

ALTER TABLE funcionario ADD funcao varchar(50);

ALTER TABLE funcionario CHANGE id_agente_de_saude id_funcionario BIGINT(20) AUTO_INCREMENT;
ALTER TABLE funcionario DROP COLUMN funcao;

ALTER TABLE funcionario ADD id_ubs BIGINT(20);
ALTER TABLE funcionario ADD id_funcao BIGINT(20);

ALTER TABLE `funcionario` ADD CONSTRAINT  FK_ID_DA_UBS FOREIGN KEY(id_ubs) REFERENCES ubs(id_ubs);
ALTER TABLE `funcionario` ADD CONSTRAINT  FK_ID_DA_FUNCAO FOREIGN KEY(id_funcao) REFERENCES funcao(id_funcao);
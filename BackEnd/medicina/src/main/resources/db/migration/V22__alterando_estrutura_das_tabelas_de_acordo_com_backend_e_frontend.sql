alter table imagem modify caminho text not null;
alter table imagem modify tipo enum('.png', '.jpg', '.jpeg', '.svg') not null;
alter table imagem modify tamanho bigint(20) unsigned not null;

alter table ubs modify nome varchar(250) unique not null;

alter table medicamento modify nome varchar(250) unique not null;

alter table estado modify nome varchar(250) unique not null;

alter table causa modify nome varchar(250) unique not null;
alter table causa modify risco int unsigned not null;

alter table funcao modify nome varchar(250) unique not null;

alter table visita modify descricao_comparecimento varchar(250);

alter table residencia modify numero bigint(20) unsigned;
alter table residencia modify cep varchar(9) not null;

alter table pessoa modify responsavel_familiar boolean not null;
alter table pessoa modify cpf_cnpj varchar(18) unique not null;
alter table pessoa modify sexo enum('M', 'F') not null;
alter table pessoa drop ativo;

alter table micro_area modify numero int unsigned not null;

alter table medicamento_pessoa modify horarios varchar(250) not null;

alter table funcionario modify nome varchar(250) not null;
alter table funcionario modify login varchar(50) unique not null;
alter table funcionario modify email varchar(100) unique not null;
alter table funcionario modify senha varchar(10) not null;
alter table funcionario modify cod_equipe int unsigned not null;
alter table funcionario modify id_ubs bigint(20) not null;
alter table funcionario modify id_funcao bigint(20) not null;
alter table funcionario modify email varchar(100) unique not null;

alter table cidade modify nome varchar(250) not null;

alter table bairro modify id_ubs bigint(20) not null;
alter table bairro modify nome varchar(250) not null;
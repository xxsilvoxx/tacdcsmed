alter table visita drop proxima_visita;
alter table visita add cod_proxima_visita BIGINT(20);
alter table visita add constraint fk_proxima_visita foreign key(cod_proxima_visita) references visita(id_visita);
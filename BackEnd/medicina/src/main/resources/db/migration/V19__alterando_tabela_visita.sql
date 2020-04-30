 alter table visita modify data_visita timestamp default current_timestamp;
 alter table visita modify data_comparecimento timestamp null;
 alter table visita add proxima_visita timestamp not null default current_timestamp;
 alter table visita add status enum('CONCLUIDA', 'PENDENTE', 'ATRASADA') not null default 'PENDENTE';
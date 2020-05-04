
/**
 * Atribuí o horário pra variável timestamp que armazena a data
 * e a hora da próxima visita.
 */
export const dateToTimestamp = (data: Date, hora: string = '08:30', fuso: number = 3) => {
  const horaUTC = hora.split(':');
  data.setUTCHours(Number(horaUTC[0]) + fuso);
  data.setUTCMinutes(Number(horaUTC[1]));
  return data;
};

/**
 * Recebe uma data em string e converte para date.
 */
export const converterPraDate = (value: any) => {
  const componentes = value.split('-');
  const valores = [];
  componentes.forEach(v => {
    valores.push(Number(v));
  });
  const date = new Date(valores.join('-'));
  return date;
};

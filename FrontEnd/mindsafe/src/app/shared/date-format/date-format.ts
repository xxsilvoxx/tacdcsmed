
/**
 * Atribuí o horário pra variável timestamp que armazena a data
 * e a hora da próxima visita.
 */
export const dateToTimestamp = (data: Date, hora: string) => {
  data = new Date(data);
  const horaUTC = hora.split(':');
  data.setUTCHours(Number(horaUTC[0]));
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

/**
 * Método que converte ***date***, extraíndo a ***hora*** formatada em horas:minutos:segundos.
 */
export const converterPraHora = (data: Date) => {
  let hora: any = data.toString();
  hora = hora.split('T');
  hora = hora[1];
  return hora;
};

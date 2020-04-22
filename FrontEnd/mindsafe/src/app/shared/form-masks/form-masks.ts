/**
 * Objeto JSON que retorna máscaras que possuem um array de RegExp
 * -----------------------------------------------------------
 * Ele trabalha de acordo com a documentação de utilização do módulo
 * angular2-text-mask.
 *
 * Cada linha representa uma máscara que ajuda o usuário a colocar
 * a informação correta na hora de preencher um formulário.
 */
export const mascaras = {
  // Máscara de CPF formatada: [ 999.999.999-99 ].
  maskCpf: [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/],
  // Máscara de CNPJ formatada: [ 99.999.999/9999-99 ].
  maskCnpj: [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/],
  // Máscara de número de Celular formatada: [ (99)99999-9999 ].
  maskCelular: ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
  // Máscara de número Telefônico formatada: [ (99)9999-9999 ].
  maskTelefone: ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
  // Máscara de Hora e Minutos formatada: [ HH:mm ].
  maskHora: [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/],
  // Máscara de CEP formatada: [ 99999-999 ].
  maskCep: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]
};

import { MicroArea } from './microArea.model';
import { Ubs } from './ubs.model';
import { Funcao } from './funcao.model';

export class Funcionario {
  idFuncionario: number;
  microArea: MicroArea;
  ubs: Ubs;
  funcao: Funcao;
  email: string;
  nome: string;
  login: string;
  senha: string;
  codEquipe: number;
}

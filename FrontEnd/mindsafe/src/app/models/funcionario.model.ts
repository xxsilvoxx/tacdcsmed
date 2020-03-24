import { MicroArea } from './microArea.model';
import { Ubs } from './ubs.model';
import { Funcao } from './funcao.model';
import { Imagem } from './imagem.model';

export class Funcionario {
  idFuncionario: number;
  imagem: Imagem;
  microArea: MicroArea;
  ubs: Ubs;
  funcao: Funcao;
  email: string;
  nome: string;
  login: string;
  senha: string;
  codEquipe: number;
}

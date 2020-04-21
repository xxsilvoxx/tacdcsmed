import { Cidade } from './cidade.model';
import { Ubs } from './ubs.model';

export class Bairro {
  idBairro: number;
  cidade: Cidade;
  ubs: Ubs;
  nome: string;
}

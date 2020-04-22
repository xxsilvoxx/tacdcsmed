import { Paciente } from './paciente.model';
import { Causa } from './causa.model';

export class CausaPessoa {
  idCausaPessoa: number;
  causa: Causa;
  pessoa: Paciente;
}

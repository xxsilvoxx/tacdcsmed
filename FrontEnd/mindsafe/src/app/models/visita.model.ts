import { Paciente } from './paciente.model';
import { Funcionario } from './funcionario.model';

export class Visita {
  idVisita: number;
  pessoa: Paciente;
  funcionario: Funcionario;
  dataVisita: Date; // Date
  anotacoes: string;
  comparecerUbs: boolean;
  dataCompare: Date; // Date
  desCompare: string;
  proximaVisita: Visita;
  status: any;
}

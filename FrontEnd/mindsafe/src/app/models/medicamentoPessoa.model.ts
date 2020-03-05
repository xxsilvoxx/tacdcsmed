import { Paciente } from './paciente.model';
import { Medicamento } from './medicamento.model';

export class MedicamentoPessoa {
  idMedicamentoPessoa: number;
  pessoa: Paciente;
  medicamento: Medicamento;
  horarios: string[];
}

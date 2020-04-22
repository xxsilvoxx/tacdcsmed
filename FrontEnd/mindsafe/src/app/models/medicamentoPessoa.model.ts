import { Paciente } from './paciente.model';
import { Medicamento } from './medicamento.model';

export class Horario {
  hora: string;

  constructor(hora?: string){
    this.hora = hora;
  }
}

export class MedicamentoPessoa {
  idMedPessoa: number;
  pessoa: Paciente;
  medicamento: Medicamento;
  horarios: string;
}

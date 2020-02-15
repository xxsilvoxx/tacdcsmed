import { Paciente } from './paciente.model';

export class Visita {
    codigo: number;
    paciente: Paciente;
    dataVisita: Date;
}
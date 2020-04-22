import { Familia } from './familia.model';
export class Paciente {
  idPessoa: number;
  familia: Familia;
  nome: string;
  responsavelFamiliar: boolean;
  cpfCnpj: string;
  dataNascimento: Date;
  sexo: string;
  nacionalidade: string;
  telefone: string;
  celular: string;
  email: string;
}

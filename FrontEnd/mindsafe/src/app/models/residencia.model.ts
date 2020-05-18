import { Familia } from './familia.model';
import { MicroArea } from './microArea.model';

export class Residencia{
    idResidencia: number;
    familia: Familia;
    microArea: MicroArea;
    cep: string;
    logradouro: string;
    numero: number;
    localReferencia: string;
    cor: string;
    complemento: string;
}

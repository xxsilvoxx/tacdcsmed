import { Familia } from './familia.model'
import { MicroArea } from './microArea.model'
import { Bairro } from './bairro.model';

export class Residencia{
    idResidencia: number;
    familia: Familia;
    microArea: MicroArea;
    bairro: Bairro;
    cep: string;
    logradouro: string;
    numero: number;
    localReferencia: string;
    cor: string;
    complemento: string;
}
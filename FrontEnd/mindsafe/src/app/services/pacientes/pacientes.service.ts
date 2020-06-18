import { Familia } from 'src/app/models/familia.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Paciente } from '../../models/paciente.model';
import { MicroArea } from '../../models/microArea.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private readonly apiUrl = `${environment.url}pessoas`;

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(paciente: Paciente) {
    return this.http.post<Paciente>(this.apiUrl, paciente).pipe(take(1));
  }

  alterar(paciente: Paciente) {
    return this.http.put<Paciente>(`${this.apiUrl}/${paciente.idPessoa}`, paciente).pipe(take(1));
  }

  listar() {
    return this.http.get<Paciente[]>(this.apiUrl).pipe(take(1));
  }

  listarPorMicroarea(microArea: MicroArea) {
    return this.http.get<Paciente[]>(`${this.apiUrl}/microarea/${microArea.idMicroArea}`).pipe(take(1));
  }

  remover(paciente: Paciente) {
    return this.http.delete<Paciente>(`${this.apiUrl}/${paciente.idPessoa}`);
  }

  retornarCpfCnpjValido(valor: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar?cpfCnpj=${valor}`).pipe(take(1));
  }

  retornarResponsavelFamiliar(familia: Familia) {
    return this.http.get<Paciente>(`${this.apiUrl}/familia/${familia.idFamilia}/responsavel`).pipe(take(1));
  }

  retornarPacientesNaoVisitados(microArea: MicroArea) {
    return this.http.get<Paciente[]>(`${this.apiUrl}/visitas/microarea/${microArea.idMicroArea}/pendentes`).pipe(take(1));
  }

  retornarPacientesComConsulta(microArea: MicroArea) {
    return this.http.get<Paciente[]>(`${this.apiUrl}/microarea/${microArea.idMicroArea}/consultas`).pipe(take(1));
  }

  retornarMembrosFamilia(familia: Familia) {
    return this.http.get<Paciente[]>(`${this.apiUrl}/familia/${familia.idFamilia}`).pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Causa } from '../../models/causa.model';
import { environment } from './../../../environments/environment';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class CausasService {

  readonly apiUrl = `${environment.url}causas`;

  constructor(
    private http: HttpClient
  ) { }

  listarCausas() {
    return this.http.get<Causa[]>(this.apiUrl).pipe(take(1));
  }

  cadastrarCausa(causa: Causa) {
    return this.http.post<Causa>(this.apiUrl, causa).pipe(take(1));
  }

  alterarCausa(causa: Causa) {
    return this.http.put<Causa>(`${this.apiUrl}/${causa.idCausa}`, causa).pipe(take(1));
  }

  removerCausa(causa: Causa) {
    return this.http.delete<Causa>(`${this.apiUrl}/${causa.idCausa}`).pipe(take(1));
  }

  validarCausaDisponivel(nome: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/causa?causa=${nome}`).pipe(take(1));
  }

  retornarTotalPacientes(causa: Causa) {
    return this.http.get<number>(`${this.apiUrl}/${causa.idCausa}/pacientes`).pipe(take(1));
  }

  retornarSomatorioRiscosPaciente(paciente: Paciente) {
    return this.http.get<number>(`${this.apiUrl}/paciente/${paciente.idPessoa}/somatorio`).pipe(take(1));
  }
}

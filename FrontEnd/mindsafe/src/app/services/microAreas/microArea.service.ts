import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { MicroArea } from '../../models/microArea.model';
import { Funcionario } from '../../models/funcionario.model';
import { Bairro } from '../../models/bairro.model';

@Injectable({
  providedIn: 'root'
})
export class MicroAreasService {

  readonly apiUrl = `${environment.url}microarea`;

  constructor(
    private http: HttpClient
  ) { }

  listarTodas() {
    return this.http.get<MicroArea[]>(this.apiUrl).pipe(take(1));
  }

  cadastrarMicroarea(microarea: MicroArea) {
    return this.http.post<MicroArea>(this.apiUrl, microarea).pipe(take(1));
  }

  removerMicroarea(microarea: MicroArea) {
    return this.http.delete<MicroArea>(`${this.apiUrl}/${microarea.idMicroArea}`).pipe(take(1));
  }

  alterarMicroarea(microarea: MicroArea) {
    return this.http.put<MicroArea>(`${this.apiUrl}/${microarea.idMicroArea}`, microarea).pipe(take(1));
  }

  retornarTotalPacientes(microarea: MicroArea) {
    return this.http.get<number>(`${this.apiUrl}/${microarea.idMicroArea}/pacientes`).pipe(take(1));
  }

  retornarAcsResponsavel(microarea: MicroArea) {
    return this.http.get<Funcionario>(`${this.apiUrl}/${microarea.idMicroArea}/responsavel`).pipe(take(1));
  }

  validarNumeroMicroareaDisponivel(numero: number, bairro: Bairro) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/bairro/${bairro.idBairro}?numero=${numero}`).pipe(take(1));
  }
}

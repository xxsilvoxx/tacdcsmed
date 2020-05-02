import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Visita } from '../../models/visita.model';
import { Paciente } from '../../models/paciente.model';


@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  readonly apiUrl = `${environment.url}visitas`;

  constructor(
    private http: HttpClient
  ) {}

  listarVisitas() {
    return this.http.get<Visita[]>(this.apiUrl).pipe(take(1));
  }

  cadastrarVisita(visita: Visita) {
    return this.http.post<Visita>(this.apiUrl, visita).pipe(take(1));
  }

  atualizarVisita(visita: Visita) {
    return this.http.put<Visita>(`${this.apiUrl}/${visita.idVisita}`, visita).pipe(take(1));
  }

  listarConsultas(paciente: Paciente) {
    return this.http.get<Visita[]>(`${this.apiUrl}/paciente/${paciente.idPessoa}/agendamentos`).pipe(take(1));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Residencia } from '../../models/residencia.model';
import { Familia } from '../../models/familia.model';
import { MicroArea } from '../../models/microArea.model';

@Injectable({
  providedIn: 'root'
})
export class ResidenciasService {

  private readonly apiUrl = `${environment.url}residencias`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Residencia[]>(this.apiUrl).pipe(take(1));
  }

  listarPorMicroarea(microArea: MicroArea) {
    return this.http.get<Residencia[]>(`${this.apiUrl}/microarea/${microArea.idMicroArea}`).pipe(take(1));
  }

  cadastrar(paciente: Residencia) {
    return this.http.post<Residencia>(this.apiUrl, paciente).pipe(take(1));
  }

  alterar(residencia: Residencia) {
    return this.http.put<Residencia>(`${this.apiUrl}/${residencia.idResidencia}`, residencia).pipe(take(1));
  }

  remover(residencia: Residencia) {
    return this.http.delete<Residencia>(`${this.apiUrl}/${residencia.idResidencia}`).pipe(take(1));
  }

  retornarResidenciaPorFamilia(familia: Familia) {
    return this.http.get<Residencia>(`${this.apiUrl}/familia/${familia.idFamilia}`).pipe(take(1));
  }

  retornarTotalFamiliares(familia: Familia) {
    return this.http.get<number>(`${this.apiUrl}/familia/total/${familia.idFamilia}`).pipe(take(1));
  }

}

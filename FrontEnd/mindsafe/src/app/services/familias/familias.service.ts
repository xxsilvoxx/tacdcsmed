import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Familia } from '../../models/familia.model';
import { MicroArea } from '../../models/microArea.model';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

  private readonly apiUrl = `${environment.url}familias`;

  constructor(private http: HttpClient) { }

  cadastrar(familia: Familia) {
    return this.http.post<Familia>(this.apiUrl, familia).pipe(take(1));
  }

  alterar(familia: Familia) {
    return this.http.put<Familia>(`${this.apiUrl}/${familia.idFamilia}`, familia).pipe(take(1));
  }

  listarPorMicroarea(microArea: MicroArea) {
    return this.http.get<Familia[]>(`${this.apiUrl}/microarea/${microArea.idMicroArea}`).pipe(take(1));
  }

  listarTodas() {
    return this.http.get<Familia[]>(this.apiUrl).pipe(take(1));
  }

  remover(familia: Familia) {
    return this.http.delete<Familia>(`${this.apiUrl}/${familia.idFamilia}`).pipe(take(1));
  }

  listarFamiliasSemResidencia() {
    return this.http.get<Familia[]>(`${this.apiUrl}/residencia/pendentes`).pipe(take(1));
  }

  familiaDisponivel(familia: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar?nome=${familia}`).pipe(take(1));
  }
}

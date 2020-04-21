import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Residencia } from '../../models/residencia.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenciasService {

  private readonly apiUrl = `${environment.url}residencias`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Residencia[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(paciente: Residencia) {
    return this.http.post<Residencia>(this.apiUrl, paciente).pipe(take(1));
  }

  alterar(residencia: Residencia, codigo: number) {
    return this.http.put<Residencia>(`${this.apiUrl}/${codigo}`, residencia);
  }

  remover(residencia: Residencia) {
    return this.http.delete<Residencia>(`${this.apiUrl}/${residencia.idResidencia}`);
  }
}

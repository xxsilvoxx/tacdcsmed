import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Estado } from '../../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  readonly apiUrl = `${environment.url}estados`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Estado[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(estado: Estado) {
    return this.http.post<Estado>(this.apiUrl, estado).pipe(take(1));
  }
}

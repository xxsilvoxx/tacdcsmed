import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Cidade } from '../../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  readonly apiUrl = `${environment.url}cidades`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Cidade[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(cidade: Cidade) {
    return this.http.post<Cidade>(this.apiUrl, cidade).pipe(take(1));
  }
}

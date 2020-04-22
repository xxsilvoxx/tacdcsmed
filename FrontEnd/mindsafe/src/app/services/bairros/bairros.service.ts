import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Bairro } from '../../models/bairro.model';

@Injectable({
  providedIn: 'root'
})
export class BairrosService {

  readonly apiUrl = `${environment.url}bairros`;

  constructor(
    private http: HttpClient
  ) { }

  listarTodos() {
    return this.http.get<Bairro[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(bairro: Bairro) {
    return this.http.post<Bairro>(this.apiUrl, bairro).pipe(take(1));
  }

  alterar(bairro: Bairro) {
    return this.http.put<Bairro>(`${this.apiUrl}/${bairro.idBairro}`, bairro).pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Ubs } from '../../models/ubs.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UbsService {

  readonly apiUrl = `${environment.url}ubs`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Ubs[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(ubs: Ubs) {
    return this.http.post<Ubs>(this.apiUrl, ubs).pipe(take(1));
  }

  validarUbsDisponivel(nome: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/nome?nome=${nome}`).pipe(take(1));
  }
}

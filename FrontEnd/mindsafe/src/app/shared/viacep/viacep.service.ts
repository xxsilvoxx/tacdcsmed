import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from './endereco.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  readonly apiUrl = "https://viacep.com.br/ws";

  constructor(
    private http: HttpClient
  ) { }

  buscarPorCep(cep: string) {
    cep = cep.replace('-', '');
    if (cep !== '') {
      return this.http.get<Endereco>(`${this.apiUrl}/${cep}/json`).pipe(take(1));
    }
  }
}

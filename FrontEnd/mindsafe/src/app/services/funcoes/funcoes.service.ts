import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Funcao } from '../../models/funcao.model';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

  readonly apiUrl = `${environment.url}funcao`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Funcao[]>(this.apiUrl).pipe(take(1));
  }

  cadastrar(funcao: Funcao) {
    return this.http.post<Funcao>(this.apiUrl, funcao).pipe(take(1));
  }

  alterar(funcao: Funcao) {
    return this.http.put<Funcao>(`${this.apiUrl}/${funcao.idFuncao}`, funcao).pipe(take(1));
  }

  remover(funcao: Funcao) {
    return this.http.delete<Funcao>(`${this.apiUrl}/${funcao.idFuncao}`).pipe(take(1));
  }

  validarFuncaoDisponivel(nome: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/nome?nome=${nome}`).pipe(take(1));
  }

  retornarTotalFuncionarios(funcao: Funcao) {
    return this.http.get<number>(`${this.apiUrl}/${funcao.idFuncao}/funcionarios`).pipe(take(1));
  }

}

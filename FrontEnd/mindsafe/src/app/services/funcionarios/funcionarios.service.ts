import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Funcionario } from '../../models/funcionario.model';
import { MicroArea } from '../../models/microArea.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  readonly apiUrl = `${environment.url}funcionarios`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Métodos para manipular o objeto do funcionário salvo no storage do navegador.
   */
  buscarFuncionarioSalvo() {
    return JSON.parse(window.sessionStorage.getItem('login-mindsafe'));
  }

  alterarObjetoSalvo(funcionario: Funcionario) {
    window.sessionStorage.removeItem('login-mindsafe');
    window.sessionStorage.setItem('login-mindsafe', JSON.stringify(funcionario));
  }

  buscarUsuario() {
    const funcionario: Funcionario = this.buscarFuncionarioSalvo();
    return this.http.get<Funcionario>(`${this.apiUrl}/${funcionario.idFuncionario}`).pipe(take(1));
  }

  listarTodos() {
    return this.http.get<Funcionario[]>(this.apiUrl).pipe(take(1));
  }

  alterar(funcionario: Funcionario) {
    this.alterarObjetoSalvo(funcionario);
    return this.http.put<Funcionario>(`${this.apiUrl}/${funcionario.idFuncionario}`, funcionario).pipe(take(1));
  }

  cadastrar(funcionario: Funcionario) {
    return this.http.post<Funcionario>(this.apiUrl, funcionario).pipe(take(1));
  }

  remover(funcionario: Funcionario) {
    return this.http.delete<Funcionario>(`${this.apiUrl}/${funcionario.idFuncionario}`).pipe(take(1));
  }

  verificarLogin(login: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/login?login=${login}`).pipe(take(1));
  }

  verificarEmail(email: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/email?email=${email}`).pipe(take(1));
  }

  verificarMicroArea(microArea: MicroArea) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/microarea/${microArea.idMicroArea}`).pipe(take(1));
  }

  retornarTotalVisitas(funcionario: Funcionario) {
    return this.http.get<number>(`${this.apiUrl}/${funcionario.idFuncionario}/visitas/total`).pipe(take(1));
  }

  logar(funcionario: Funcionario) {
    return this.http.post<Funcionario>(`${this.apiUrl}/logar`, funcionario).pipe(take(1));
  }
}

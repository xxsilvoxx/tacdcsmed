import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Funcionario } from '../../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  private readonly apiUrl = `${environment.url}user`;

  constructor(
    private http: HttpClient
  ) { }

  enviarEmail(email: string) {
    const func = new Funcionario();
    func.email = email;
    return this.http.post<Funcionario>(`${this.apiUrl}/reset/password?email=${email}`, func).pipe(take(1));
  }

  validarToken(token: string, funcionario: Funcionario) {
    return this.http.get<boolean>(`${this.apiUrl}/${funcionario.idFuncionario}/validate?token=${token}`).pipe(take(1));
  }

  salvarNovaSenha(senha: string, funcionario: Funcionario) {
    return this.http.post<boolean>(`${this.apiUrl}/change?senha=${senha}`, funcionario).pipe(take(1));
  }
}

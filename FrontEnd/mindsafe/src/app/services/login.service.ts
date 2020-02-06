import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = `${environment.url}login`;

  constructor(
    private http: HttpClient
  ) { }

  logar(funcionario: Funcionario) {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }
}

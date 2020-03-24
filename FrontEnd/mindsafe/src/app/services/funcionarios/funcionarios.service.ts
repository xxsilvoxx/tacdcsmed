import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../../models/funcionario.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  readonly apiUrl = `${environment.url}funcionarios`;

  constructor(
    private http: HttpClient
  ) { }

  listarUsuario() {
    return this.http.get<Funcionario>(`${this.apiUrl}/${1}`).pipe(take(1));
  }
}

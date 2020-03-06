import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../../models/paciente.model';
import { CausaPessoa } from '../../models/causaPessoa.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CausaPessoaService {

  readonly apiUrl = `${environment.url}causasPessoas`;

  constructor(
    private http: HttpClient
  ) { }

  listarCausas(paciente: Paciente) {
    return this.http.get<CausaPessoa[]>(`${this.apiUrl}/paciente/${paciente.idPessoa}`).pipe(take(1));
  }
}

import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { MedicamentoPessoa } from '../../models/medicamentoPessoa.model';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoPessoaService {

  readonly apiUrl = `${environment.url}medicamentoPessoas`;

  constructor(
    private http: HttpClient
  ) { }

  retornarMedicamentos(paciente: Paciente) {
    return this.http.get<MedicamentoPessoa[]>(`${this.apiUrl}/paciente/${paciente.idPessoa}`).pipe(take(1));
  }
}

import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { MedicamentoPessoa } from '../../models/medicamentoPessoa.model';
import { Paciente } from '../../models/paciente.model';
import { Medicamento } from '../../models/medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoPessoaService {

  readonly apiUrl = `${environment.url}medicamentoPessoas`;

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(medicamentoPessoa: MedicamentoPessoa) {
    return this.http.post(this.apiUrl, medicamentoPessoa).pipe(take(1));
  }

  retornarMedicamentos(paciente: Paciente) {
    return this.http.get<MedicamentoPessoa[]>(`${this.apiUrl}/paciente/${paciente.idPessoa}`).pipe(take(1));
  }

  retornarTotalDependentes(medicamento: Medicamento) {
    return this.http.get<number>(`${this.apiUrl}/medicamento/${medicamento.idMedicamento}/dependentes`).pipe(take(1));
  }

  alterar(medicamentoPessoa: MedicamentoPessoa) {
    return this.http.put<MedicamentoPessoa>(`${this.apiUrl}/${medicamentoPessoa.idMedPessoa}`, medicamentoPessoa).pipe(take(1));
  }

  remover(medicamentoPessoa: MedicamentoPessoa) {
    return this.http.delete<MedicamentoPessoa>(`${this.apiUrl}/${medicamentoPessoa.idMedPessoa}`).pipe(take(1));
  }
}

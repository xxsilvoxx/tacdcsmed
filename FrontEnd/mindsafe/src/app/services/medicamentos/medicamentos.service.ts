import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Medicamento } from '../../models/medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  readonly apiUrl = `${environment.url}medicamentos`;

  constructor(
    private http: HttpClient
  ) { }

  cadastrarMedicamento(medicamento: Medicamento) {
    return this.http.post<Medicamento>(this.apiUrl, medicamento).pipe(take(1));
  }

  listarMedicamentos() {
    return this.http.get<Medicamento[]>(this.apiUrl).pipe(take(1));
  }

  alterarMedicamento(medicamento: Medicamento) {
    return this.http.put<Medicamento>(`${this.apiUrl}/${medicamento.idMedicamento}`, medicamento).pipe(take(1));
  }

  removerMedicamento(medicamento: Medicamento) {
    return this.http.delete<Medicamento>(`${this.apiUrl}/${medicamento.idMedicamento}`).pipe(take(1));
  }

  validarNomeMedicamentoValido(nome: string) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/nome?nome=${nome}`).pipe(take(1));
  }

}

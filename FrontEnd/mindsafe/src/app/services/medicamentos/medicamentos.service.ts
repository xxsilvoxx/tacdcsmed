import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from '../../models/medicamento.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  readonly apiUrl = `${environment.url}medicamentos`;

  constructor(
    private http: HttpClient
  ) { }

  listarMedicamentos() {
    return this.http.get<Medicamento[]>(this.apiUrl).pipe(take(1));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private readonly apiUrl = `${environment.url}pessoas`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Paciente[]>(this.apiUrl).pipe(take(1));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { MicroArea } from '../../models/microArea.model';

@Injectable({
  providedIn: 'root'
})
export class MicroAreasService {

  readonly apiUrl = `${environment.url}microarea`;

  constructor(
    private http: HttpClient
  ) { }

  listarTodas() {
    return this.http.get<MicroArea[]>(this.apiUrl).pipe(take(1));
  }

  cadastrarMicroarea(microarea: MicroArea) {
    return this.http.post<MicroArea>(this.apiUrl, microarea).pipe(take(1));
  }

  validarNumeroMicroareaDisponivel(numero: number) {
    return this.http.get<boolean>(`${this.apiUrl}/validar/${numero}`);
  }
}

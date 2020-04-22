import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

export interface Pais {
  gentilico: string
  nomePais: string;
  nomePaisInternacional: string;
  sigla: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  readonly apiUrl = '../../../assets/json/paises.json';

  constructor(
    private http: HttpClient
  ) { }

  listarPaises() {
    return this.http.get<Pais[]>(this.apiUrl).pipe(take(1));
  }
}

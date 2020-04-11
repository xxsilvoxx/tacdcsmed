import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Ubs } from '../../models/ubs.model';

@Injectable({
  providedIn: 'root'
})
export class UbsService {

  readonly apiUrl = `${environment.url}ubs`;

  constructor(
    private http: HttpClient
  ) { }

  listar() {
    return this.http.get<Ubs[]>(this.apiUrl);
  }
}

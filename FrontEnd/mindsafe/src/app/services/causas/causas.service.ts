import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Causa } from '../../models/causa.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CausasService {

  readonly apiUrl = `${environment.url}causas`;

  constructor(
    private http: HttpClient
  ) { }

  listarCausas() {
    return this.http.get<Causa[]>(this.apiUrl).pipe(take(1));
  }
}

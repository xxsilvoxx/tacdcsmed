import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Familia } from '../../models/familia.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

  readonly apiUrl = `${environment.url}familias`;

  constructor(
    private http: HttpClient
  ) { }

  listarTodas() {
    return this.http.get<Familia[]>(this.apiUrl).pipe(take(1));
  }
}

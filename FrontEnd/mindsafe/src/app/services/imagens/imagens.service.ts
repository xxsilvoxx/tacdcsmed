import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class ImagensService {

  readonly apiUrl = `${environment.url}imagens`;

  constructor(
    private http: HttpClient
  ) { }

  buscarImg(funcionario: Funcionario) {
    return `${this.apiUrl}/funcionario/${funcionario.idFuncionario}`;
  }
}

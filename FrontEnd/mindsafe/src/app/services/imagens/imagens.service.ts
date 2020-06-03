import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Funcionario } from '../../models/funcionario.model';
import { Imagem } from '../../models/imagem.model';

@Injectable({
  providedIn: 'root'
})
export class ImagensService {

  readonly apiUrl = `${environment.url}imagens/funcionario`;
  readonly usuarioSemImg = '../../../assets/imagens/user.png';

  constructor(
    private http: HttpClient
  ) { }

  buscarImg(funcionario: Funcionario) {
    if (funcionario.imagem !== null) {
      return `${this.apiUrl}/${funcionario.idFuncionario}`;
    }
    return this.usuarioSemImg;
  }

  adicionarImg(imagem: File, funcionario: Funcionario) {
    const formData = new FormData();
    formData.append('imagem', imagem, imagem.name);
    return this.http.post<Imagem>(`${this.apiUrl}/${funcionario.idFuncionario}`, formData).pipe(take(1));
  }

  removerImg(funcionario: Funcionario) {
    return this.http.delete<Imagem>(`${this.apiUrl}/${funcionario.idFuncionario}`).pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensagemValidationService {

  constructor() { }

  listarMensagensErro(label: string, validacao: string, extra?: any) {
    const mensagens = {
      'required' : `O campo de ${label} é obrigatório`,
      'email' : 'Deve ser um e-mail válido',
      'minlength' : `${label} deve ter no mínimo ${extra.requiredLength} caracteres`,
      'maxlength' : `${label} deve ter no máximo ${extra.requiredLength} caracteres`,
      'cpfCnpjInvalido': 'Já existe um registro com esse número',
    };
    return mensagens[validacao];
  }

  getErrorMessage(campo: FormControl, label: string) {
    for (const propertyName in campo.errors) {
      if (campo.errors.hasOwnProperty(propertyName) && campo.touched) {
        return this.listarMensagensErro(label, propertyName, campo.errors[propertyName]);
      }
    }
  }
}

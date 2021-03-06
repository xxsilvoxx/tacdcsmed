import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MensagemValidationService {

  constructor() { }

  listarMensagensErro(label: string, validacao: string, extra?: any) {
    const mensagens = {
      'required' : `${label} é um campo obrigatório`,
      'email' : 'Deve ser um e-mail válido',
      'minlength' : `${label} deve ter no mínimo ${extra.requiredLength} caracteres`,
      'maxlength' : `${label} deve ter no máximo ${extra.requiredLength} caracteres`,
      'cpfCnpjInvalido': 'Esse número já está cadastrado',
      'senhaDiferente': 'A senha deve ser igual',
      'igualOriginal': 'Senha igual à original',
      'loginInvalido': 'Este login já está sendo usado',
      'emailInvalido': 'Este email já está sendo usado',
      'medicamentoInvalido': 'Este medicamento já está cadastrado',
      'microareaInvalida': 'Esta microárea já está cadastrada',
      'numeroInvalido': `${label} deve ser positivo`,
      'familiaInvalida': 'Esta família já está cadastrada',
      'causaInvalida': 'Este risco já está cadastrado',
      'funcaoInvalida': 'Esta função já está cadastrada',
      'ubsInvalida': 'Esta UBS já está cadastrada'
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { funcaoDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { FuncoesService } from '../../../services/funcoes/funcoes.service';
import { Funcao } from '../../../models/funcao.model';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';

@Component({
  selector: 'app-cadastrar-funcao',
  templateUrl: './cadastrar-funcao.component.html',
  styleUrls: ['./cadastrar-funcao.component.scss']
})
export class CadastrarFuncaoComponent implements OnInit {

  formFuncao: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CadastrarFuncaoComponent>,
    private builder: FormBuilder,
    private service: FuncoesService,
    private validation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  cadastrarFuncao() {
    this.service.cadastrar(this.formFuncao.value).subscribe(
      success => {
        this.msg.exibirMensagem('Função cadastrada com sucesso', 'done');
        this.dialogRef.close();
      },
      err => this.msg.exibirMensagem('Erro ao cadastrar a função', 'error')
    );
  }

  criarFormulario() {
    this.formFuncao = this.builder.group({
      idFuncao: [null],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.min(3),
          Validators.maxLength(250)
        ],
        asyncValidators: [
          funcaoDisponivelValidator(this.service)
        ]
      }]
    });
  }
}

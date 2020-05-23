import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { validarNumeroMinimo, causaDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { CausasService } from '../../../services/causas/causas.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';

@Component({
  selector: 'app-cadastrar-risco',
  templateUrl: './cadastrar-risco.component.html',
  styleUrls: ['./cadastrar-risco.component.scss']
})
export class CadastrarRiscoComponent implements OnInit {

  formCausa: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CadastrarRiscoComponent>,
    private builder: FormBuilder,
    private service: CausasService,
    private validation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formCausa = this.builder.group({
      nome: [null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ],
        asyncValidators: [
          causaDisponivelValidator(this.service)
        ]
      }],
      risco: [null, [
        Validators.required,
        validarNumeroMinimo.bind(this)
      ]]
    });
  }

  cadastrarCausa() {
    this.service.cadastrarCausa(this.formCausa.value).subscribe(
      success => this.msg.exibirMensagem('Risco cadastrado com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao cadastrar o risco', 'error')
    );
    this.dialogRef.close();
  }

}

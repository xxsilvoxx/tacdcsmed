import { MensagemValidationService } from './../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FamiliasService } from './../../services/familias/familias.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familias-form-modal',
  templateUrl: './familias-form-modal.component.html',
  styleUrls: ['./familias-form-modal.component.scss']
})
export class FamiliasFormComponent implements OnInit {

  formFamilia: FormGroup;

  constructor(
    private builder: FormBuilder,
    private familiasService: FamiliasService,
    private dialogRef: MatDialogRef<FamiliasFormComponent>,
    private mensagem: MensagemService,
    private validation: MensagemValidationService,
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario(){
    this.formFamilia = this.builder.group({
      idFamilia: [null],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      }]
    })
  }

  retornarValidacoes(control: FormControl, label: string){
    return this.validation.getErrorMessage(control, label);
  }

  cadastrar(){
    this.familiasService.cadastrar(this.formFamilia.value).subscribe(
      res => {
        this.mensagem.exibirMensagem("Cadastrado com sucesso", "done");
        this.dialogRef.close(res);
      },
      err => {
        this.mensagem.exibirMensagem("Erro ao cadastrar", "error");
      }
    );
  }

}

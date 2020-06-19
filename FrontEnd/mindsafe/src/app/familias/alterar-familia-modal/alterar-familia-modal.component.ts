import { Component, OnInit, Inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Paciente } from './../../models/paciente.model';
import { PacientesService } from './../../services/pacientes/pacientes.service';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { MensagemValidationService } from './../../shared/mensagem-validation/mensagem-validation.service';
import { FamiliasService } from './../../services/familias/familias.service';
import { FamiliasFormComponent } from './../familias-form-modal/familias-form-modal.component';
import { familiaDisponivelValidator } from '../../shared/mensagem-validation/form-validations';

@Component({
  selector: 'app-alterar-familia-modal',
  templateUrl: './alterar-familia-modal.component.html',
  styleUrls: ['./alterar-familia-modal.component.scss']
})
export class AlterarFamiliaModalComponent implements OnInit {

  formFamilia: FormGroup;
  responsavelFamiliarControl: FormControl;
  responsavelRetornado: Paciente;
  membros: Paciente[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private familiasService: FamiliasService,
    private pacienteService: PacientesService,
    private dialogRef: MatDialogRef<FamiliasFormComponent>,
    private mensagem: MensagemService,
    private validation: MensagemValidationService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.preencherFormulario(this.data.dados);
    this.listarMembrosFamilia();
  }

  criarFormulario() {
    this.formFamilia = this.builder.group({
      idFamilia: [null],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ],
        asyncValidators: [ familiaDisponivelValidator(this.familiasService) ]
      }]
    });

    this.responsavelFamiliarControl = this.builder.control(null, {
      validators: [ Validators.required ]
    });
  }

  preencherFormulario(dados: any) {
    this.formFamilia.patchValue({
      idFamilia: dados.familia.idFamilia,
      nome: dados.familia.nome
    });
    this.responsavelRetornado = dados.responsavel;
    this.responsavelFamiliarControl.setValue(dados.responsavel);
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  listarMembrosFamilia() {
    this.pacienteService.retornarMembrosFamilia(this.formFamilia.value).pipe(
      tap(value => {
        value.forEach(pessoa => {
          if (this.responsavelFamiliarControl.value) {
            if (pessoa.idPessoa == this.responsavelFamiliarControl.value.idPessoa) {
              this.responsavelFamiliarControl.setValue(pessoa);
            }
          }

        })
      })
    ).subscribe(
      res => this.membros = res,
      err => this.mensagem.exibirMensagem("Erro ao retornar lista", "error")
    )
  }

  alterar(){
    this.familiasService.alterar(this.formFamilia.value).pipe(
      tap(familia => {
        const retornado = this.membros.filter(value => value.idPessoa === this.responsavelRetornado.idPessoa);

        if (this.responsavelFamiliarControl.value.idPessoa != this.responsavelRetornado.idPessoa) {
          this.responsavelFamiliarControl.value.responsavelFamiliar = true;
          this.responsavelRetornado.responsavelFamiliar = false;
          this.pacienteService.alterar(this.responsavelRetornado).pipe(
            switchMap(responsavel => responsavel ? this.pacienteService.alterar(this.responsavelFamiliarControl.value) : EMPTY)
          ).subscribe(
            success => success,
            err => this.mensagem.exibirMensagem("Erro ao alterar responsável", "error")
          );
        }
      })

    ).subscribe(
      res => {
        this.mensagem.exibirMensagem("Alterado com sucesso", "done");
        this.dialogRef.close(res);
      },
      err => {
        this.mensagem.exibirMensagem("Erro ao alterar", "error");
      }
    );
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Familia } from 'src/app/models/familia.model';
import { FamiliasService } from '../../services/familias/familias.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { Residencia } from '../../models/residencia.model';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { ResidenciasService } from '../../services/residencias/residencias.service';
import { MicroArea } from 'src/app/models/microArea.model';
import { MicroAreasService } from 'src/app/services/microAreas/microArea.service';
import { mascaras } from '../../shared/form-masks/form-masks';
import { validarNumeroMinimo } from '../../shared/mensagem-validation/form-validations';

@Component({
  selector: 'app-residencias-form',
  templateUrl: './residencias-form.component.html',
  styleUrls: ['./residencias-form.component.scss']
})
export class ResidenciasFormComponent implements OnInit {

  maskCep = mascaras.maskCep;
  isEditar = false;

  /**
   * Variáveis para o layout, usadas pra mostrar se é Alteração ou Adição (padrão).
   */
  tituloModal = 'Adicionar Residencia';
  txtBotao = 'CADASTRAR';

  /**
   * Caso passado por parâmetro a residencia, valida para alterar seus dados.
   */
  residencia: Residencia = new Residencia();

  /**
   * Declaração do formulário do residencia.
   */
  formResidencia: FormGroup;

  familias: Familia[];
  microAreas: MicroArea[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalRef: MatDialogRef<ResidenciasFormComponent>,
    private builder: FormBuilder,
    private residenciasService: ResidenciasService,
    private familiasService: FamiliasService,
    private microAreasService: MicroAreasService,
    private msgValidation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.residencia = this.data.residencia;
    this.criarFormularios();
    this.verificarView(this.residencia);
    this.listarFamilias();
    this.listarMicroAreas();
  }

  /**
   * Método responsável por trazer as informações do residencia selecionado, para que
   * o usuário possa verificar o que precisa ser mudado.
   */
  verificarView(residencia?: Residencia) {
    if (residencia) {
      this.tituloModal = 'Alterar Residencia';
      this.txtBotao = 'ALTERAR';
      this.formResidencia.setValue({
        familia: residencia.familia,
        microArea: residencia.microArea,
        cep: residencia.cep,
        logradouro: residencia.logradouro,
        numero: residencia.numero,
        cor: residencia.cor,
        localReferencia: residencia.localReferencia,
        complemento: residencia.complemento
      });

    }
  }

  // Método que avalia se está cadastrando ou alterando o usuário
  // Ele é chamado quando o botão de de confirmação na última etapa do
  // cadastro, é pressioando.
  onConfirm() {
    if (this.residencia) {
      // Altera os dados da residencia
      this.residenciasService.alterar(this.formResidencia.value, this.residencia.idResidencia).subscribe(
        residencia => {
          this.msg.exibirMensagem('Residencia alterada com sucesso', 'done');
          this.modalRef.close(residencia);
        },
        err => this.msg.exibirMensagem('Erro ao alterar a residencia', 'error')
      );
    } else {
      // cadastra a residencia.
      this.residenciasService.cadastrar(this.formResidencia.value).subscribe(
        residencia => {
          this.msg.exibirMensagem('Residencia cadastrada com sucesso', 'done');
          this.modalRef.close(residencia);
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar a residencia', 'error')
      );
    }
  }

  onDecline() {
    this.modalRef.close();
  }

  retornarValidacoes(label: string, campo: FormControl) {
    return this.msgValidation.getErrorMessage(campo, label);
  }

  criarFormularios() {
    this.formResidencia = this.builder.group({
      familia: ['', Validators.required],
      microArea: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      numero: [null, validarNumeroMinimo.bind(this) ],
      cor: [''],
      localReferencia: [''],
      complemento: ['']
    });
  }

  listarFamilias() {
    this.familiasService.listarTodas().pipe(
      tap(v => {
        if (this.residencia) {
          v.forEach(
            c => {
              if (c.idFamilia === this.residencia.familia.idFamilia) {
                this.formResidencia.get('familia').setValue(c);
              }
            }
          );
        }
      })
    ).subscribe(
      res => {
        if (res.length === 0) {
          this.msg.exibirMensagem('A lista de famílias está vazia', 'info');
        }
        this.familias = res;
      },
      err => this.msg.exibirMensagem('Erro ao carregar as famílias', 'error')
    );
  }

  listarMicroAreas() {
    this.microAreasService.listarTodas().pipe(
      tap(v => {
        if (this.residencia) {
          v.forEach(
            c => {
              if (c.idMicroArea === this.residencia.microArea.idMicroArea) {
                this.formResidencia.get('microArea').setValue(c);
              }
            }
          );
        }
      })
    ).subscribe(
      res => {
        if (res.length === 0) {
          this.msg.exibirMensagem('A lista de Microáreas está vazia', 'info');
        }
        this.microAreas = res;
      },
      err => this.msg.exibirMensagem('Erro ao carregar as Microáreas', 'error')
    );
  }
}

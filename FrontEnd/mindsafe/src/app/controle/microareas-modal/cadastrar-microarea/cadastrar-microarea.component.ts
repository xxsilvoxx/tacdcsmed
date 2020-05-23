import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { MicroArea } from '../../../models/microArea.model';
import { Bairro } from '../../../models/bairro.model';
import { BairrosService } from '../../../services/bairros/bairros.service';
import { validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { Ubs } from '../../../models/ubs.model';
import { UbsService } from '../../../services/ubs/ubs.service';

@Component({
  selector: 'app-cadastrar-microarea',
  templateUrl: './cadastrar-microarea.component.html',
  styleUrls: ['./cadastrar-microarea.component.scss']
})
export class CadastrarMicroareaComponent implements OnInit {

  formMicroarea: FormGroup;
  controlUbs: FormControl;

  bairros$: Observable<Bairro[]>;
  ubs$: Observable<Ubs[]>;

  bairroPossuiUbs = false;
  alterarUbs = false;
  disabledCampoUbs = false;

  constructor(
    private dialogRef: MatDialogRef<CadastrarMicroareaComponent>,
    private builder: FormBuilder,
    private bairrosService: BairrosService,
    private ubsService: UbsService,
    private microareasService: MicroAreasService,
    private msg: MensagemService,
    private validation: MensagemValidationService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.listarBairros();
    this.listarUbs();
  }

  /**
   * Caso o usuário ao cadastrar outra microárea
   * identificar que precisar mudar a UBS do bairro
   * o slide toggle aparece na tela.
   */
  onAlterarCampoUbs() {
    if (this.alterarUbs) {
      this.disabledCampoUbs = false;
      this.controlUbs.setValidators(Validators.required);
    } else {
      this.disabledCampoUbs = true;
      this.controlUbs.clearValidators();
    }
  }

  /**
   * Método que analisa o bairro passado por parâmetro
   * verifica se o mesmo possui uma ubs setada
   */
  desabilitarSelecaoUbs(bairro: Bairro) {
    if (bairro.ubs !== null) {
      this.bairroPossuiUbs = true;
      this.disabledCampoUbs = true;
    } else {
      this.bairroPossuiUbs = false;
    }
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formMicroarea = this.builder.group({
      numero: [null, {
        validators: [ Validators.required, validarNumeroMinimo.bind(this) ]
      }],
      bairro: [null, {
        validators: [ Validators.required ]
      }]
    });

    this.controlUbs = this.builder.control(null, {
      validators: [Validators.required]
    });
  }

  listarBairros() {
    this.bairros$ = this.bairrosService.listarTodos();
  }

  listarUbs() {
    this.ubs$ = this.ubsService.listar();
  }

  cadastrar() {
    const microarea = this.formMicroarea.value as MicroArea;
    const ubs = this.controlUbs.value as Ubs;
    if (microarea.bairro.ubs === null) {
      microarea.bairro.ubs = ubs;
      this.bairrosService.alterar(microarea.bairro).pipe(
        switchMap(b => b
          ? (microarea.bairro = b, this.microareasService.cadastrarMicroarea(microarea))
          : EMPTY
        )
      ).subscribe(
        res => this.msg.exibirMensagem('Microárea cadastrada com sucesso', 'done'),
        err => this.msg.exibirMensagem('Erro ao cadastrar a microárea', 'error')
      );
    } else if (this.alterarUbs) {
      microarea.bairro.ubs = ubs;
      this.bairrosService.alterar(microarea.bairro).pipe(
        switchMap(b => b
          ? (microarea.bairro = b, this.microareasService.cadastrarMicroarea(microarea))
          : EMPTY
        )
      ).subscribe(
        res => this.msg.exibirMensagem('Microárea cadastrada com sucesso', 'done'),
        err => this.msg.exibirMensagem('Erro ao cadastrar a microárea', 'error')
      );
    }
    this.dialogRef.close();
  }
}

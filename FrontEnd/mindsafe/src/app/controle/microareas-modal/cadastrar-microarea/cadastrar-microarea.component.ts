import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MicroArea } from '../../../models/microArea.model';
import { Observable } from 'rxjs';
import { Bairro } from '../../../models/bairro.model';
import { BairrosService } from '../../../services/bairros/bairros.service';
import { microareaDisponivelValidator, validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrar-microarea',
  templateUrl: './cadastrar-microarea.component.html',
  styleUrls: ['./cadastrar-microarea.component.scss']
})
export class CadastrarMicroareaComponent implements OnInit {

  formMicroarea: FormGroup;

  bairros$: Observable<Bairro[]>;

  constructor(
    private dialogRef: MatDialogRef<CadastrarMicroareaComponent>,
    private builder: FormBuilder,
    private bairrosService: BairrosService,
    private microareasService: MicroAreasService,
    private msg: MensagemService,
    private validation: MensagemValidationService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.listarBairros();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formMicroarea = this.builder.group({
      numero: [null, {
        validators: [ Validators.required, validarNumeroMinimo.bind(this) ],
        asyncValidators: [microareaDisponivelValidator(this.microareasService)]
      }],
      bairro: [null, {
        validators: [ Validators.required ]
      }]
    });
  }

  listarBairros() {
    this.bairros$ = this.bairrosService.listarTodos();
  }

  cadastrar() {
    this.microareasService.cadastrarMicroarea(this.formMicroarea.value).subscribe(
      success => this.msg.exibirMensagem('Microárea cadastrada com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao cadastrar a microárea', 'error')
    );
    this.dialogRef.close();
  }
}

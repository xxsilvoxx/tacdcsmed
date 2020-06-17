import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { validarNumeroMinimo, microareaDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { MicroArea } from '../../../models/microArea.model';
import { Bairro } from '../../../models/bairro.model';
import { Ubs } from '../../../models/ubs.model';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { BairrosService } from '../../../services/bairros/bairros.service';
import { UbsService } from '../../../services/ubs/ubs.service';
import { Cidade } from '../../../models/cidade.model';
import { Estado } from '../../../models/estado.model';
import { CidadesService } from '../../../services/cidades/cidades.service';
import { EstadosService } from '../../../services/estados/estados.service';
import { FuncionariosService } from '../../../services/funcionarios/funcionarios.service';
import { Funcionario } from '../../../models/funcionario.model';

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

  bairros: Bairro[] = [];
  funcionario = new Funcionario();

  bairroPossuiUbs = false;
  alterarUbs = false;
  disabledCampoUbs = false;

  constructor(
    private dialogRef: MatDialogRef<CadastrarMicroareaComponent>,
    private builder: FormBuilder,
    private bairrosService: BairrosService,
    private funcionariosService: FuncionariosService,
    private ubsService: UbsService,
    private microareasService: MicroAreasService,
    private msg: MensagemService,
    private validation: MensagemValidationService
  ) { }

  ngOnInit() {
    this.funcionario = this.funcionariosService.buscarFuncionarioSalvo();
    this.listarBairros();
    this.criarFormulario();
    this.filtrarBairros();
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
    } else {
      this.disabledCampoUbs = true;
    }
  }

  /**
   * Método que analisa o bairro passado por parâmetro
   * verifica se o mesmo possui uma ubs setada
   */
  desabilitarSelecaoUbs(bairro: string) {
    const bairroExistente = this.bairros.filter(
      v => v.nome.toLowerCase().indexOf(bairro.toLowerCase().trim()) >= 0
    )[0];

    if (bairroExistente !== undefined) {
      if (bairroExistente.ubs !== null) {
        this.formMicroarea.get('ubs').setValue(bairroExistente.ubs);
        this.bairroPossuiUbs = true;
        this.disabledCampoUbs = true;
      } else {
        this.bairroPossuiUbs = false;
      }
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
      }],
      ubs: [null, {
        validators: [ Validators.required ]
      }]
    });
  }

  filtrarBairros() {
    this.bairros$ = this.formMicroarea.get('bairro').valueChanges.pipe(
      startWith(''),
      map(value => this._filtro(value))
    );
  }

  private _filtro(valor: string) {
    let filterValue: string;

    if (valor) {
      filterValue = valor.toLowerCase().trim();

      if (this.bairros) {
        return this.bairros.filter(bairro => bairro.nome.toLowerCase().includes(filterValue));
      }
    }
  }

  listarBairros() {
    this.bairrosService.listarTodos().subscribe(
      res => this.bairros = res,
      err => this.msg.exibirMensagem('Erro ao listar os bairros', 'error')
    );
  }

  listarUbs() {
    this.ubs$ = this.ubsService.listar();
  }

  atribuirValidador(control: FormControl, outroCampo: string) {
    control.setAsyncValidators(microareaDisponivelValidator(this.microareasService, outroCampo));
  }

  cadastrar() {
    const bairro = this.bairros.filter(
      // tslint:disable-next-line: no-shadowed-variable
      bairro => bairro.nome.toLowerCase() === this.formMicroarea.get('bairro').value.toLowerCase().trim()
    )[0];
    const ubs = this.formMicroarea.get('ubs').value;
    const microarea = new MicroArea();
    microarea.numero = this.formMicroarea.get('numero').value;

    if (bairro === undefined) {
      const novoBairro = new Bairro();
      novoBairro.ubs = ubs;
      novoBairro.nome = this.formMicroarea.get('bairro').value;
      novoBairro.cidade = this.funcionario.microArea.bairro.cidade;

      this.bairrosService.cadastrar(novoBairro).pipe(
        switchMap(b => b
          ? (microarea.bairro = b, this.microareasService.cadastrarMicroarea(microarea))
          : EMPTY
        )
      ).subscribe(
        res => this.msg.exibirMensagem('Microárea cadastrada com sucesso', 'done'),
        err => this.msg.exibirMensagem('Erro ao cadastrar a microárea', 'error')
      );
    } else {
      microarea.bairro = bairro;
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
      } else {
        this.microareasService.cadastrarMicroarea(microarea).subscribe(
          res => this.msg.exibirMensagem('Microárea cadastrada com sucesso', 'done'),
          err => this.msg.exibirMensagem('Erro ao cadastrar a microárea', 'error')
        );
      }
    }
    this.dialogRef.close();
  }

}

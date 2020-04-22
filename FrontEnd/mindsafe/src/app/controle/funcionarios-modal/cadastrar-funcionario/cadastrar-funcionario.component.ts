import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { FuncionariosService } from '../../../services/funcionarios/funcionarios.service';
import { emailDisponivelValidator, loginDisponivelValidator, validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { Ubs } from '../../../models/ubs.model';
import { MicroArea } from '../../../models/microArea.model';
import { Funcao } from '../../../models/funcao.model';
import { UbsService } from '../../../services/ubs/ubs.service';
import { FuncoesService } from '../../../services/funcoes/funcoes.service';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {

  formFuncionario: FormGroup;
  controlConfirmaSenha: FormControl;

  ubs$: Observable<Ubs[]>;
  funcoes$: Observable<Funcao[]>;

  microAreas: MicroArea[];

  gruposMicroareas: any[] = [
    {
      disabled: false,
      nome: 'Microáreas Disponíveis',
      microareas: [] as MicroArea[]
    },
    {
      disabled: true,
      nome: 'Microáreas Indisponíveis',
      microareas: [] as MicroArea[]
    }
  ];

  mostrarSenha = false;

  constructor(
    private dialogRef: MatDialogRef<CadastrarFuncionarioComponent>,
    private service: FuncionariosService,
    private ubsService: UbsService,
    private funcaoService: FuncoesService,
    private microAreaService: MicroAreasService,
    private builder: FormBuilder,
    private validation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.atribuirValidacoesConfirmarSenha();
    this.listarMicroareas();
    this.listarUbs();
    this.listarFuncoes();
  }

  onMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formFuncionario = this.builder.group({
      ubs: [null, {
        validators: [ Validators.required ]
      }],
      funcao: [null, {
        validators: [ Validators.required ]
      }],
      microArea: [null, {
        validators: [ Validators.required ]
      }],
      email: [null, {
        validators: [
          Validators.email,
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ],
        asyncValidators: [
          emailDisponivelValidator(this.service)
        ]
      }],
      login: [null, {
        validators: [
          Validators.required,
          Validators.maxLength(50)
        ],
        asyncValidators: [
          loginDisponivelValidator(this.service)
        ]
      }],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      }],
      senha: [null, {
        validators: [
          Validators.maxLength(10),
          Validators.required
        ]
      }],
      codEquipe: [null, {
        validators: [
          Validators.required,
          validarNumeroMinimo.bind(this)
        ]
      }]
    });

    this.controlConfirmaSenha = this.builder.control(null);
  }

  confirmarSenhaValidator(control: FormControl) {
    if (control.value !== this.formFuncionario.get('senha').value) {
      return { senhaDiferente: true };
    }
    return null;
  }

  atribuirValidacoesConfirmarSenha() {
    this.controlConfirmaSenha.setValidators([
      Validators.required,
      Validators.maxLength(10),
      this.confirmarSenhaValidator.bind(this)
    ]);
  }

  listarUbs() {
    this.ubs$ = this.ubsService.listar();
  }

  listarFuncoes() {
    this.funcoes$ = this.funcaoService.listar();
  }

  listarMicroareas() {
    this.microAreaService.listarTodas().pipe(
      tap(microareas =>
        microareas.forEach(microarea => {
          this.service.verificarMicroArea(microarea).pipe(
            tap(res => {
              if (res) {
                this.gruposMicroareas[0].microareas.push(microarea);
              } else {
                this.gruposMicroareas[1].microareas.push(microarea);
              }
            })
          ).subscribe(
            success => success,
            err => err
          );
        }),
      )
    ).subscribe(
      res => this.microAreas = res,
      err => err
    );
  }

  cadastrarFuncionario() {
    this.service.cadastrar(this.formFuncionario.value).subscribe(
      success => {
        this.msg.exibirMensagem('Funcionário cadastrado com sucesso', 'done');
        this.dialogRef.close();
      },
      err => this.msg.exibirMensagem('Erro ao cadastrar o funcionário', 'error')
    );
  }

}

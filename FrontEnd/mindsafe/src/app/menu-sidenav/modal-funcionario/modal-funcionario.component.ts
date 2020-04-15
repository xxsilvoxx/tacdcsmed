import { loginDisponivelValidator } from './../../shared/mensagem-validation/form-validations';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';

import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { Funcionario } from '../../models/funcionario.model';
import { ImagensService } from '../../services/imagens/imagens.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { switchMap, tap } from 'rxjs/operators';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { Funcao } from '../../models/funcao.model';
import { emailDisponivelValidator, validarNumeroMinimo } from '../../shared/mensagem-validation/form-validations';
import { UbsService } from '../../services/ubs/ubs.service';
import { MicroAreasService } from '../../services/microAreas/microArea.service';
import { Ubs } from '../../models/ubs.model';
import { MicroArea } from '../../models/microArea.model';
import { FuncoesService } from '../../services/funcoes/funcoes.service';

@Component({
  selector: 'app-modal-funcionario',
  templateUrl: './modal-funcionario.component.html',
  styleUrls: ['./modal-funcionario.component.scss']
})
export class ModalFuncionarioComponent implements OnInit {

  esconderSenha = false;
  mostrarErroArquivo = false;

  // Variável que armazena a senha atual do usuário
  // mas será utilizada pra comparar com a senha alterada.
  formFuncionario: FormGroup;
  formConfirmarSenha: FormControl;

  funcoes: Funcao[];
  microAreas: MicroArea[];
  ubsList: Ubs[];

  gruposMicroareas: any[] = [
    {
      disabled: false,
      nome: 'Microárea Atual',
      microareas: [] as MicroArea[]
    },
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

  // Armazena a senha vinda do servidor, caso o funcionario desista
  // de alterar.
  senhaSalva: string;

  imgUsuario = '../../../assets/imagens/user.png';

  // variável que armazena a imagem selecionada para fazer upload.
  imgUpload: File = null;

  constructor(
    private modalRef: MatDialogRef<ModalFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: FuncionariosService,
    private ubsService: UbsService,
    private microAreaService: MicroAreasService,
    private funcoesService: FuncoesService,
    private img: ImagensService,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.listarFuncoes();
    this.listarMicroareas();
    this.listarUbs();
    this.preencherFormulario(this.data.funcionario);
  }

  criarFormulario() {
    this.formFuncionario = this.builder.group({
      idFuncionario: [null, {
        validators: [ Validators.required ]
      }],
      imagem: [null],
      microArea: [null, {
        validators: [ Validators.required ]
      }],
      ubs: [null, {
        validators: [ Validators.required ]
      }],
      funcao: [null, {
        validators: [ Validators.required ]
      }],
      email: [null, {
        validators: [Validators.email, Validators.required],
        asyncValidators: [emailDisponivelValidator(this.service)]
      }],
      nome: [null, {
        validators: [Validators.maxLength(250), Validators.required]
      }],
      login: [null, {
        validators: [Validators.maxLength(250), Validators.required],
        asyncValidators: [loginDisponivelValidator(this.service)]
      }],
      senha: [null, {
        validators: [Validators.maxLength(10), Validators.required]
      }],
      codEquipe: [null, {
        validators: [Validators.required, validarNumeroMinimo.bind(this)]
      }]
    });
  }

  preencherFormulario(funcionario: Funcionario) {
    this.formFuncionario.setValue({
      idFuncionario: funcionario.idFuncionario,
      imagem: funcionario.imagem,
      microArea: funcionario.microArea,
      ubs: funcionario.ubs,
      funcao: funcionario.funcao.nome,
      email: funcionario.email,
      nome: funcionario.nome,
      login: funcionario.login,
      senha: funcionario.senha,
      codEquipe: funcionario.codEquipe
    });
    this.carregarImg(funcionario);
    this.formConfirmarSenha = new FormControl(funcionario.senha, this.compararSenha.bind(this));
    this.senhaSalva = funcionario.senha;
  }

  retornarValidacoes(campo: string, label: string) {
    const campoInput = campo === 'confirmarSenha'
      ? this.formConfirmarSenha
      : this.formFuncionario.get(campo);
    return this.validation.getErrorMessage(campoInput as FormControl, label);
  }

  // Validação de senha, faz validação de senha e confirmação da senha
  compararSenha(control: FormControl) {
    if (this.formFuncionario.get('senha').value === control.value) {
      return null;
    } else {
      return { senhaDiferente: true };
    }
  }

  mudarVisibilidadeSenha() {
    this.esconderSenha = !this.esconderSenha;
  }

  /**
   * Carrega a imagem do usuário caso ele possua.
   */
  carregarImg(funcionario: Funcionario) {
    if (funcionario.imagem !== null) {
      this.imgUsuario = this.img.buscarImg(funcionario);
    }
  }

  /**
   * Seleciona o arquivo que será feito o upload.
   */
  onSelectFile(event) {
    const file = event.srcElement.files as FileList;
    this.retornarTamanhoInvalido(file[0]);
  }

  retornarTamanhoInvalido(file: File) {
    if (file.size > 1048576 ) {
      return (this.mostrarErroArquivo = true);
      this.imgUpload = null;
    } else {
      this.imgUpload = file;
      return (this.mostrarErroArquivo = false);
    }
  }

  onUpload() {
    if (this.imgUpload && this.imgUpload.size > 0 && this.imgUpload.size <= 1048576) {
      this.img.adicionarImg(this.imgUpload, this.formFuncionario.value).pipe(
        tap(v => v !== null
          ? this.imgUsuario = '../../../assets/imagens/user.png'
          : EMPTY),
        switchMap(v => v !== null ? this.service.listarUsuario() : EMPTY)
      ).subscribe(
        res => {
          this.preencherFormulario(res);
          if (this.formFuncionario.get('imagem').value !== null) {
            this.imgUsuario = this.img.buscarImg(this.formFuncionario.value);
            this.imgUpload = null;
          }
        },
        err => this.msg.exibirMensagem('Erro ao fazer upload', 'error')
      );
    }
  }

  onRemoveImg() {
    this.img.removerImg(this.formFuncionario.value).pipe(
      tap(v => v === null
        ? this.imgUsuario = '../../../assets/imagens/user.png'
        : EMPTY
      )
    ).subscribe(
      success => {
        this.msg.exibirMensagem('Imagem removida com sucesso', 'done');
        this.formFuncionario.get('imagem').setValue(null);
      },
      err => this.msg.exibirMensagem('Erro ao remover a imagem', 'error')
    );
  }

  alterar(label: string) {
    const funcaoDigitada = this.formFuncionario.get('funcao').value;
    const funcao = this.funcoes.filter(v => v.nome === funcaoDigitada);
    this.formFuncionario.get('funcao').setValue(funcao[0]);
    console.log(this.formFuncionario.value);
    this.service.alterar(this.formFuncionario.value).subscribe(
      success => this.msg.exibirMensagem(`${label} alterado(a) com sucesso`, 'done'),
      err => this.msg.exibirMensagem(`Erro ao alterar o(a) ${label}`, 'error')
    );
    this.formFuncionario.get('funcao').setValue(funcao[0].nome);
    this.gruposMicroareas.forEach((obj) => obj.microareas = []);
    this.listarMicroareas();
  }

  cancelarAlteracaoSenha() {
    this.formFuncionario.get('senha').setValue(this.senhaSalva);
    this.formConfirmarSenha.setValue(this.senhaSalva);
  }

  listarMicroareas() {
    this.microAreaService.listarTodas().pipe(
      tap(microareas =>
        microareas.forEach(microarea => {
          if (this.formFuncionario.get('microArea').value.idMicroArea === microarea.idMicroArea) {
            this.formFuncionario.get('microArea').setValue(microarea);
          }
          this.service.verificarMicroArea(microarea).pipe(
            tap(res => {
              if (res) {
                this.gruposMicroareas[1].microareas.push(microarea);
              } else if (this.formFuncionario.get('microArea').value.idMicroArea === microarea.idMicroArea) {
                this.gruposMicroareas[0].microareas.push(microarea);
              } else {
                this.gruposMicroareas[2].microareas.push(microarea);
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
      err => this.msg.exibirMensagem('Erro ao buscar as Microáreas', 'error')
    );
  }

  listarFuncoes() {
    this.funcoesService.listar().subscribe(
      res => this.funcoes = res,
      err => this.msg.exibirMensagem('Erro ao buscar as funções', 'error')
    );
  }

  listarUbs() {
    this.ubsService.listar().pipe(
      tap(list => list.forEach(
        ubs => {
          if (this.formFuncionario.get('ubs').value.idUbs === ubs.idUbs) {
            this.formFuncionario.get('ubs').setValue(ubs);
          }
        }
      ))
    ).subscribe(
      res => this.ubsList = res,
      err => this.msg.exibirMensagem('Erro ao buscar as UBS', 'error')
    );
  }

}

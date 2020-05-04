import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { mascaras } from 'src/app/shared/form-masks/form-masks';
import { FuncionariosService } from './../../services/funcionarios/funcionarios.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Paciente } from '../../models/paciente.model';
import { Visita } from '../../models/visita.model';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { VisitaService } from '../../services/visitas/visita.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { dateToTimestamp, converterPraDate } from '../../shared/date-format/date-format';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {

  // Armazena a referência do ícone que será utilizado:
  // Se for pra cadastrar -> Send
  // Se for pra alterar -> Edit
  iconBtn = 'send';

  // Armazena data e hora atuais do navegador.
  dataAtual: Date = new Date();

  // Armazena a lista de pacientes
  // Só será carregado caso seja um
  // cadastro novo.
  pacientes$: Observable<Paciente[]>;

  // Lista com os os possíves status da visita
  listStatus: string[] = [
    'CONCLUIDA', // [0] --> Se refere a visitas já realizadas.
    'PENDENTE',  // [1] --> Se refere a visitas que ainda devem ser realizas até o prazo.
    'ATRASADA'   // [2] --> Se refere a visitas que já passaram do prazo.
  ];

  // Armazena a máscara de hora para o template.
  mask =  mascaras.maskHora;

  // Variável que é utilizada no slide-toggle.
  comparecerUbs = false;

  formVisitas: FormGroup;
  horarioControl: FormControl;
  horarioProximaVisitaControl: FormControl;

  // Variável local que armazena o objeto visita
  // sempre é populado quando a visita selecionada
  // possui uma próxima visita vinculada á ela.
  proximaVisitaSalva: Visita = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FormVisitasComponent>,
    private builder: FormBuilder,
    private funcionariosService: FuncionariosService,
    private pacientesService: PacientesService,
    private visitasService: VisitaService,
    private validation: MensagemValidationService,
    private msg: MensagemService
  ) {}

  ngOnInit() {
    this.criarFormulario();
    // Verifica se o atributo data tem um valor setado por padrão.
    if (this.data) {
      // Caso tenha preenche os campos.
      this.preencherCampos(this.data.dados as Visita);
    } else {
      this.listarPacientes();
      this.buscarFuncionario();
    }
  }

  /**
   * Cria o formulário de visitas com todas as validações iniciais.
   */
  criarFormulario() {
    this.formVisitas = this.builder.group({
      idVisita: [null],
      pessoa: [null, Validators.required],
      funcionario: [null, Validators.required],
      dataVisita: [this.dataAtual, Validators.required],
      anotacoes: [null],
      comparecerUbs: [false],
      dataCompare: [null],
      desCompare: [null],
      proximaVisita: [null, Validators.required],
      status: [this.listStatus[1], Validators.required]
    });

    // Campo horário da próxima visita.
    this.horarioProximaVisitaControl = this.builder.control(null, {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]
    });

    // Campo horário para angendamentos.
    this.horarioControl =  this.builder.control(null, {
      validators: [
        Validators.minLength(5),
        Validators.maxLength(5)
      ]
    });
  }

  /**
   * Método responsável por receber o valor da lista, e seta-lo
   * no formulário.
   */
  preencherCampos(visita: Visita) {
    this.formVisitas.setValue({
      idVisita: visita.idVisita,
      pessoa: visita.pessoa,
      funcionario: visita.funcionario,
      // Caso o status da visita seja diferente de CONCLUÍDO,
      // seta a data da visita realizada para a data atual,
      // uma forma de não alterar da data das visitas já
      // realizadas, mantendo uma integridade.
      dataVisita: (visita.status !== this.listStatus[0])
        ? this.dataAtual
        : converterPraDate(visita.dataVisita),
      anotacoes: visita.anotacoes,
      comparecerUbs: visita.comparecerUbs,
      // Caso possua algum valor na data de comparecimento
      // é setada a data no campo.
      dataCompare: visita.dataCompare
        ? converterPraDate(visita.dataCompare)
        : null,
      desCompare: visita.desCompare,
      proximaVisita: visita.proximaVisita
        ? converterPraDate(visita.proximaVisita.dataVisita)
        : null,
      status: visita.status
    });

    // Caso possua uma próxima visita, o objeto proximaVisita recebe
    // do elemento selecionado.
    visita.proximaVisita != null
      ? (
        // Por padrão está setando 08:30 por problemas no timestamp.
        this.horarioProximaVisitaControl.setValue('08:30'),
        this.proximaVisitaSalva = visita.proximaVisita
      )
      // tslint:disable-next-line: no-unused-expression
      : null;

    // Muda o icone do botão para edit.
    this.iconBtn = 'edit';

    // Caso o comparecer UBS seja true, ele já deixa o
    // expanssion panel aberto.
    this.comparecerUbs = visita.comparecerUbs;
  }

  // Chama classe que lista todos os erros de validação por campo.
  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  // Lista os pacientes cadastrados.
  listarPacientes() {
    this.pacientes$ = this.pacientesService.listar();
  }

  // Busca o primeiro funcionário cadastrado.
  buscarFuncionario() {
    this.funcionariosService.listarUsuario().subscribe(
      res => this.formVisitas.get('funcionario').setValue(res),
      error => error
    );
  }

  // Método para mudar o slide-toggle.
  mudarComparecerUbs() {
    this.comparecerUbs = !this.comparecerUbs;
  }

  /**
   * Método responsável por validar se o usuário está
   * adicionando uma nova visita ou alterando uma já
   * pre-existente.
   */
  onConfirm() {
    if (this.data) {
      this.alterarVisita();
    } else {
      this.cadastrar();
    }
  }

  /**
   * # Método que cadastra novos registros.
   * ----
   * Sempre que for usado o float-button, o resultado final será
   * feito por este método.
   */
  cadastrar() {
    // Seta o status como CONCLUIDO já que a visita foi realizada.
    this.formVisitas.get('status').setValue(this.listStatus[0]);

    // Recebe a data da proxima visita, pra criar um novo objeto.
    const dataProximaVisita: Date = this.formVisitas.get('proximaVisita').value;

    // Chama o método que irá criar o próximo objeto visita.
    const proximaVisita = this.criarProximaVisita(this.formVisitas.value, dataProximaVisita);
    this.formVisitas.get('proximaVisita').setValue(proximaVisita);

    // Antes de cadastrar a visita realizada, primeiro é cadastrada
    // a visita futura para depois passar com o código para poder
    // ser salva na visita atual.
    this.visitasService.cadastrarVisita(proximaVisita).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      switchMap(proximaVisita => proximaVisita.idVisita !== null
        ? (
          // Caso tenha sido cadastrada com sucesso a visita futura,
          // retorna o objeto já com o código, e abaixo seta a proxima
          // visita, com essa visita gerada por primeiro.
          this.formVisitas.get('proximaVisita').setValue(proximaVisita),
          this.visitasService.cadastrarVisita(this.formVisitas.value)
        )
        : EMPTY
      )
    ).subscribe(
      res => {
        this.msg.exibirMensagem('Visita realizada com sucesso', 'done');
        this.dialogRef.close(res);
      },
      err => this.msg.exibirMensagem('Erro ao salvar dados da visita', 'error')
    );
  }

  /**
   * # Método que altera visitas existentes.
   * ----
   * Sempre que for selecionada uma visita **pendente**
   * ou **atrasada**, este método é chamado.
   */
  alterarVisita() {
    // Recebe a data selecionada no formulário e
    // o horário da proxima visita, chama o método
    // que converte de date para timestamp.
    const dataProximaVisita = dateToTimestamp(this.formVisitas.get('proximaVisita').value, this.horarioProximaVisitaControl.value);

    // Caso tenha sido marcado o slide-toggle para
    // comparecer na UBS, essa condição é atendida.
    if (this.comparecerUbs) {

      // Converte a data da consulta e o horário para um
      // obejto timestamp.
      const dataCompare = dateToTimestamp(this.formVisitas.get('dataCompare').value, this.horarioControl.value);
      this.formVisitas.get('dataCompare').setValue(dataCompare);
    }
    this.formVisitas.get('status').setValue(this.listStatus[0]);

    // Caso a visita esteja concluída
    // e possui uma próxima visita.
    if (this.proximaVisitaSalva !== null) {
      this.proximaVisitaSalva.dataVisita = dataProximaVisita;

      // Atualiza primeiro a próxima visita,
      // e retorna o objeto para a alterar a
      // visita atual.
      this.visitasService.atualizarVisita(this.proximaVisitaSalva).pipe(
        switchMap(proximaVisita => proximaVisita
          ? (
            this.formVisitas.get('proximaVisita').setValue(proximaVisita),
            this.visitasService.atualizarVisita(this.formVisitas.value))
          : EMPTY
        )
      ).subscribe(
        res => {
          this.msg.exibirMensagem('Visita realizada com sucesso', 'done');
          this.dialogRef.close(res);
        },
        err => this.msg.exibirMensagem('Erro ao realizar a visita', 'error')
      );
      // Caso não possua uma próxima visita
      // cai nessa condição.
    } else {

      // Cria o objeto de proxima visita.
      const proximaVisita = this.criarProximaVisita(this.formVisitas.value, dataProximaVisita);
      this.formVisitas.get('proximaVisita').setValue(proximaVisita);

      // Adiciona a próxima visita, e retorna o objeto
      // para alterar a visita atual.
      this.visitasService.cadastrarVisita(proximaVisita).pipe(
        switchMap(visita => visita.idVisita !== null
          ? (
            this.formVisitas.get('proximaVisita').setValue(visita),
            this.visitasService.atualizarVisita(this.formVisitas.value)
          )
          : EMPTY
        )
      ).subscribe(
        res => {
          this.msg.exibirMensagem('Visita realizada com sucesso', 'done');
          this.dialogRef.close(res);
        },
        err => this.msg.exibirMensagem('Erro ao realizar a visita', 'error')
      );
    }
  }

  /**
   * Método responsável por criar um novo objeto visita
   * que possui a data passada.
   */
  criarProximaVisita(visita: Visita, proximaData: Date) {
    const proximaVisita: Visita = new Visita();
    proximaVisita.dataVisita = proximaData;
    proximaVisita.funcionario = visita.funcionario;
    proximaVisita.pessoa = visita.pessoa;
    proximaVisita.status = this.listStatus[1];
    return proximaVisita;
  }

}



import {Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { mascaras } from 'src/app/shared/form-masks/form-masks';
import { Funcionario } from './../../models/funcionario.model';
import { FuncionariosService } from './../../services/funcionarios/funcionarios.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Paciente } from '../../models/paciente.model';
import { Visita } from '../../models/visita.model';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {

  iconBtn = 'send';

  dataAtual: Date = new Date();
  paciente: Paciente = new Paciente();
  funcionario: Funcionario = new Funcionario();

  pacientes$: Observable<Paciente[]>;

  listStatus: string[] = [
    "CONCLUIDA",
    "PENDENTE",
    "ATRASADA"
  ];

  mask =  mascaras.maskHora;

  comparecerUbs = false;

  formVisitas: FormGroup;
  horarioControl: FormControl;
  horarioProximaVisitaControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private builder: FormBuilder,
    private funcionariosService: FuncionariosService,
    private pacientesService: PacientesService,
    private validation: MensagemValidationService
  ) {}

  ngOnInit() {
    this.criarFormulario();
    if (this.data) {
      this.preencherCampos(this.data.dados as Visita);
    }
    this.listarPacientes();
    this.buscarFuncionario();
  }

  preencherCampos(visita: Visita) {
    this.formVisitas.setValue({
      idVisita: visita.idVisita,
      pessoa: visita.pessoa,
      funcionario: visita.funcionario,
      dataVisita: visita.dataVisita,
      anotacoes: visita.anotacoes,
      comparecerUbs: visita.comparecerUbs,
      dataCompare: visita.dataCompare,
      desCompare: visita.desCompare,
      proximaVisita: visita.proximaVisita,
      status: visita.status
    });
  }

  criarFormulario() {
    this.formVisitas = this.builder.group({
      idVisita: [null],
      pessoa: [null, Validators.required],
      funcionario: [this.funcionario, Validators.required],
      dataVisita: [this.dataAtual, Validators.required],
      anotacoes: [null],
      comparecerUbs: [false],
      dataCompare: [null],
      desCompare: [null],
      proximaVisita: [null, Validators.required],
      status: [null, Validators.required]
    });

    this.horarioProximaVisitaControl = this.builder.control(null, {
      validators: [
        Validators.minLength(5),
        Validators.maxLength(5)
      ]
    });

    this.horarioControl =  this.builder.control(null, {
      validators: [
        Validators.minLength(5),
        Validators.maxLength(5)
      ]
    });
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  listarPacientes() {
    this.pacientes$ = this.pacientesService.listar();
  }

  buscarFuncionario() {
    this.funcionariosService.listarUsuario().subscribe(
      res => this.funcionario = res,
      error => error
    );
  }

  mudarComparecerUbs() {
    this.comparecerUbs = !this.comparecerUbs;
  }

  cadastrar() {
    this.formVisitas.get('status').setValue(this.listStatus[0]);
  }

  alterarVisita() {

  }

}



import { Funcionario } from './../../models/funcionario.model';
import { FuncionariosService } from './../../services/funcionarios/funcionarios.service';
import { Paciente } from './../../models/paciente.model';

import {Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mascaras } from 'src/app/shared/form-masks/form-masks';


@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {
  dataAtual: Date = new Date();
  paciente: Paciente = new Paciente();
  funcionario: Funcionario = new Funcionario();

  listStatus: string[]= [
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
    public dialog: MatDialog,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private funcionariosService: FuncionariosService

    ) {}

  ngOnInit() {
    this.criarFormulario();
    this.paciente = this.data.dados.pessoa;
    this.buscarFuncionario();

  }

  buscarFuncionario(){
    this.funcionariosService.listarUsuario().subscribe(
      res => this.funcionario = res,
      error => error

    );
  }

  criarFormulario() {
    this.formVisitas = this.builder.group({
      idVisita: [null],
      paciente: [this.paciente, Validators.required],
      funcionario: [this.funcionario, Validators.required],
      dataVisita: [Validators.required],
      anotacoes: [null],
      comparecerUbs: [false],
      dataCompare: [null],
      desCompare: [null],
      proximaVisita: [this.dataAtual, Validators.required],
      status: [null]
    });

    this.horarioProximaVisitaControl = this.builder.control(null, {validators:
      [Validators.minLength(5), Validators.maxLength(5)] } );

    this.horarioControl =  this.builder.control(null, {validators:
      [Validators.minLength(5), Validators.maxLength(5)] } );

    this.formVisitas.get('dataVisita').setValue(new Date());

  }

  mudarComparecerUbs() {
    this.comparecerUbs = !this.comparecerUbs;

  }

  cadastrar() {

    this.formVisitas.get('status').setValue(this.listStatus[0]);


  }






}



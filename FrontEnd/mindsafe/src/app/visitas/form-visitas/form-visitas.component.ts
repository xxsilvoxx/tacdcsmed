
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mascaras } from 'src/app/shared/form-masks/form-masks';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {
  dataAtual: Date = new Date();
  
  mask =  mascaras.maskHora;

  comparecerUbs = false;

  formVisitas: FormGroup;
  horarioControl: FormControl;

  constructor(
    public dialog: MatDialog,
    private builder: FormBuilder
    
    ) {}

  ngOnInit(){
    this.criarFormulario();

  }

  criarFormulario() {
    this.formVisitas = this.builder.group({
      idVisita: [null],
      paciente: [null, Validators.required],
      funcionario: [null, Validators.required],
      dataVisita: [Validators.required],
      anotacoes: [null],
      comparecerUbs: [false],
      dataCompare: [null],
      desCompare: [null]
    });

    this.horarioControl =  this.builder.control(null, {validators: 
      [Validators.minLength(5), Validators.maxLength(5)] } );
      
    this.formVisitas.get('dataVisita').setValue(new Date());
    console.log(this.formVisitas.get('dataVisita').value);

  };

  mudarComparecerUbs() {
    this.comparecerUbs = !this.comparecerUbs; 

  };






}



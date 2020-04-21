
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {
  dataAtual: Date = new Date();
  
  formVisitas: FormGroup;

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
      comparecerUbs: [null],
      dataCompare: [null],
      desCompare: [null]
    });

    this.formVisitas.get('dataVisita').setValue(new Date());
    console.log(this.formVisitas.get('dataVisita').value);

  }




}



import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-familias-form-modal',
  templateUrl: './familias-form-modal.component.html',
  styleUrls: ['./familias-form-modal.component.scss']
})
export class FamiliasFormComponent implements OnInit {

  formFamilia: FormGroup;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario(){
    this.formFamilia = this.builder.group({
      idFamilia: [null],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      }]
    })
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Paciente } from '../../models/paciente.model';

@Component({
  selector: 'paciente-info-modal',
  templateUrl: './paciente-info-modal.component.html',
  styleUrls: ['./paciente-info-modal.component.scss']
})
export class PacienteInfoModalComponent implements OnInit {

  pacienteSelecionado: Paciente = new Paciente();

  constructor(
    private modalRef: MatDialogRef<PacienteInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente
  ) { }

  ngOnInit() {
    this.pacienteSelecionado = this.data;
  }

  onClose() {
    this.modalRef.close();
  }

}

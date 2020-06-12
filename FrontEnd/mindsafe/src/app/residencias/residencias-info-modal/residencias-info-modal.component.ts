import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MensagemService } from './../../shared/mensagem/mensagem.service';
import { ResidenciasService } from './../../services/residencias/residencias.service';
import { Familia } from '../../models/familia.model';

@Component({
  selector: 'app-residencias-info-modal',
  templateUrl: './residencias-info-modal.component.html',
  styleUrls: ['./residencias-info-modal.component.scss']
})
export class ResidenciasInfoModalComponent implements OnInit {

  familia = new Familia();
  residencia = [];

  constructor(
    private modalRef: MatDialogRef<ResidenciasInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private residenciasService: ResidenciasService,
  ) { }

  ngOnInit() {
    this.familia = this.data.residencia.familia;
    this.retornaResidencias();
  }

  // retorna informações da residencia
  retornaResidencias() {
    if (this.data.residencia.logradouro) {
      this.residencia.push(`${this.data.residencia.logradouro}`);
    }
    if (this.data.residencia.numero) {
      this.residencia.push(`Número: ${this.data.residencia.numero}`);
    }
    if (this.data.residencia.microArea.bairro.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.cidade.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.estado.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.cidade.estado.nome}`);
    }
    if (this.data.residencia.cep) {
      this.residencia.push(`CEP: ${this.data.residencia.cep}`);
    }
    if (this.data.residencia.localReferencia) {
      this.residencia.push(`${this.data.residencia.localReferencia}`);
    }
    if (this.data.residencia.complemento) {
      this.residencia.push(`${this.data.residencia.complemento}`);
    }
  }

  retornarTotalFamiliares() {
    return this.residenciasService.retornaTotalFamiliares(this.familia);
  }

  onClose() {
    this.modalRef.close();
  }

}

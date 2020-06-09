import { ResidenciasService } from './../../services/residencias/residencias.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemService } from '../mensagem/mensagem.service';
import { Residencia } from 'src/app/models/residencia.model';



@Component({
  selector: 'app-residencias-info-modal',
  templateUrl: './residencias-info-modal.component.html',
  styleUrls: ['./residencias-info-modal.component.scss']
})
export class ResidenciasInfoModalComponent implements OnInit {


  familia = [];
  residencia = [];

  constructor(
    private modalRef: MatDialogRef<ResidenciasInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private residenciasService: ResidenciasService,
  ) { }

  ngOnInit() {
    this.retornaResidencias();
    this.retornaFamilia();
    this.retornaTotalFamiliares();
  }

  // retorna informações da residencia
  retornaResidencias() {
    if (this.data.residencia.idResidencia) {
      this.residencia.push(`${this.data.residencia.idResidencia}`);
    }
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

  retornaFamilia() {
    // Retorna nome da familia
    if (this.data.residencia.familia.nome) {
      this.familia.push(`${this.data.residencia.familia.nome}`);
    }
  }

  retornaTotalFamiliares() {
    this.residenciasService.retornaTotalFamiliares(this.data.residencia.familia.idFamilia);
  }
  onClose() {
    this.modalRef.close();
  }

}

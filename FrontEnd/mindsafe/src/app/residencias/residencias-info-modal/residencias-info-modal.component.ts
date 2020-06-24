import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ResidenciasService } from './../../services/residencias/residencias.service';
import { Residencia } from '../../models/residencia.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-residencias-info-modal',
  templateUrl: './residencias-info-modal.component.html',
  styleUrls: ['./residencias-info-modal.component.scss']
})
export class ResidenciasInfoModalComponent implements OnInit {

  residencia = new Residencia();
  totMembros$: Observable<string>;

  endereco = [];

  constructor(
    private modalRef: MatDialogRef<ResidenciasInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private residenciasService: ResidenciasService,
  ) { }

  ngOnInit() {
    this.residencia = this.data.residencia;
    this.retornaResidencias();
    this.retornarTotalFamiliares();
  }

  // retorna informações da residencia
  retornaResidencias() {
    if (this.data.residencia.logradouro) {
      this.endereco.push(`${this.data.residencia.logradouro}`);
    }
    if (this.data.residencia.numero) {
      this.endereco.push(`Número: ${this.data.residencia.numero}`);
    } else {
      this.endereco.push('SN');
    }
    if (this.data.residencia.microArea.bairro.nome) {
      this.endereco.push(`${this.data.residencia.microArea.bairro.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.nome) {
      this.endereco.push(`${this.data.residencia.microArea.bairro.cidade.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.estado.nome) {
      this.endereco.push(`${this.data.residencia.microArea.bairro.cidade.estado.nome}`);
    }
    if (this.data.residencia.cep) {
      this.endereco.push(`CEP: ${this.data.residencia.cep}`);
    }
    if (this.data.residencia.localReferencia) {
      this.endereco.push(`${this.data.residencia.localReferencia}`);
    }
    if (this.data.residencia.complemento) {
      this.endereco.push(`${this.data.residencia.complemento}`);
    }
  }

  retornarTotalFamiliares() {
    this.totMembros$ = this.residenciasService.retornarTotalFamiliares(this.residencia.familia).pipe(
      map(membros => membros === 0
        ? 'Nenhum integrante'
        : (membros > 1 ? `${membros} integrantes` : 'Apenas 1 integrante')
      )
    );
  }

  onClose() {
    this.modalRef.close();
  }

}

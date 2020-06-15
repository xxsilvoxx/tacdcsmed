import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ResidenciasService } from '../../services/residencias/residencias.service';
import { Residencia } from '../../models/residencia.model';
import { MicroAreasService } from '../../services/microAreas/microArea.service';
import { MicroArea } from '../../models/microArea.model';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';

@Component({
  selector: 'app-residencias-alterar',
  templateUrl: './residencias-alterar.component.html',
  styleUrls: ['./residencias-alterar.component.scss']
})
export class ResidenciasAlterarComponent implements OnInit {

  residencias: Residencia[] = [];
  microareas$: Observable<MicroArea[]>;
  microaAreaControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ResidenciasAlterarComponent>,
    private builder: FormBuilder,
    private service: ResidenciasService,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private microareasService: MicroAreasService
  ) { }

  ngOnInit() {
    this.residencias = this.data.residencias;
    this.criarControl();
    this.listarMicroAreas();
  }

  retornarEndereco(residencia: Residencia) {
    const endereco = [];
    if (residencia.numero) {
      endereco.push(residencia.numero);
    }
    if (residencia.logradouro) {
      endereco.push(residencia.logradouro);
    }
    if (residencia.cep) {
      endereco.push(residencia.cep);
    }
    if (residencia.microArea) {
      endereco.push(residencia.microArea.bairro.nome);
      endereco.push(residencia.microArea.bairro.cidade.nome);
      endereco.push(residencia.microArea.bairro.cidade.estado.nome);
    }
    return endereco.join(' - ');
  }

  retornarValidacoes() {
    return this.validation.getErrorMessage(this.microaAreaControl, 'Microárea');
  }

  criarControl() {
    this.microaAreaControl = this.builder.control(null, Validators.required);
  }

  listarMicroAreas() {
    this.microareas$ = this.microareasService.listarTodas();
  }

  alterarRegistros() {
    for (const residencia of this.residencias) {
      residencia.microArea = this.microaAreaControl.value as MicroArea;
      this.service.alterar(residencia).subscribe(
        success => this.msg.exibirMensagem('Residências alteradas com sucesso', 'done'),
        err => this.msg.exibirMensagem(`Erro ao alterar a residência ${ residencia.idResidencia }`, 'error')
      );
    }
    this.dialogRef.close(this.residencias);
  }

}

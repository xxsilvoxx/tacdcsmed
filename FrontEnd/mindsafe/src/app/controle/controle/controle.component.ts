import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CadastrarMedicamentoComponent } from '../medicamentos-modal/cadastrar-medicamento/cadastrar-medicamento.component';
import { VizualizarMedicamentosComponent } from '../medicamentos-modal/vizualizar-medicamentos/vizualizar-medicamentos.component';
import { CadastrarMicroareaComponent } from '../microareas-modal/cadastrar-microarea/cadastrar-microarea.component';
import { VizualizarMicroareasComponent } from '../microareas-modal/vizualizar-microareas/vizualizar-microareas.component';
import { CadastrarRiscoComponent } from '../riscos-modal/cadastrar-risco/cadastrar-risco.component';
import { VizualizarRiscosComponent } from '../riscos-modal/vizualizar-riscos/vizualizar-riscos.component';
import { CadastrarFuncaoComponent } from '../funcoes-modal/cadastrar-funcao/cadastrar-funcao.component';
import { VizualizarFuncoesComponent } from '../funcoes-modal/vizualizar-funcoes/vizualizar-funcoes.component';
import { CadastrarUbsComponent } from '../ubs-modal/cadastrar-ubs/cadastrar-ubs.component';
import { VizualizarUbsComponent } from '../ubs-modal/vizualizar-ubs/vizualizar-ubs.component';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  abrirModalMedicamento(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarMedicamentoComponent, {
        height: '300px',
        width: '450px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarMedicamentosComponent, {
        height: '480px',
        width: '510px'
      });
    }
  }

  abrirModalMicroarea(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarMicroareaComponent, {
        height: '450px',
        width: '600px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarMicroareasComponent, {
        height: '500px',
        width: '1000px'
      });
    }
  }

  abrirModalRiscos(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarRiscoComponent, {
        height: '350px',
        width: '550px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarRiscosComponent, {
        height: '500px',
        width: '650px'
      });
    }
  }

  abrirModalFuncoes(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarFuncaoComponent, {
        height: '300px',
        width: '500px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarFuncoesComponent, {
        height: '460px',
        width: '500px'
      });
    }
  }

  abrirModalUbs(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarUbsComponent, {
        height: '540px',
        width: '600px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarUbsComponent, {
        height: '480px',
        width: '750px'
      });
    }
  }

}

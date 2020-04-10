import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarMedicamentoComponent } from '../medicamentos-modal/cadastrar-medicamento/cadastrar-medicamento.component';
import { VizualizarMedicamentosComponent } from '../medicamentos-modal/vizualizar-medicamentos/vizualizar-medicamentos.component';
import { CadastrarMicroareaComponent } from '../microareas-modal/cadastrar-microarea/cadastrar-microarea.component';
import { VizualizarMicroareasComponent } from '../microareas-modal/vizualizar-microareas/vizualizar-microareas.component';
import { CadastrarRiscoComponent } from '../riscos-modal/cadastrar-risco/cadastrar-risco.component';
import { VizualizarRiscosComponent } from '../riscos-modal/vizualizar-riscos/vizualizar-riscos.component';

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
        height: '498px',
        width: '576px'
      });
    }
  }

  abrirModalMicroarea(operacao: string) {
    if (operacao.trim().toLowerCase() === 'cadastrar') {
      const dialogRef = this.dialog.open(CadastrarMicroareaComponent, {
        height: '350px',
        width: '600px'
      });
    } else if (operacao.trim().toLowerCase() === 'vizualizar') {
      const dialogRef = this.dialog.open(VizualizarMicroareasComponent, {
        height: '498px',
        width: '576px'
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
        width: '620px'
      });
    }
  }

}

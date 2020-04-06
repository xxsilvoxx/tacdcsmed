import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarMedicamentoComponent } from '../medicamentos-modal/cadastrar-medicamento/cadastrar-medicamento.component';
import { VizualizarMedicamentosComponent } from '../medicamentos-modal/vizualizar-medicamentos/vizualizar-medicamentos.component';

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

}

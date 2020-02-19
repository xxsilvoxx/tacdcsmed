import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


// Interface temporária
export interface Paciente {
  nome: string;
  codigo: number;
  familia: string;
  cpfCnpj: string;
}

const ELEMENT_DATA: Paciente[] = [
  { codigo: 1, nome: 'Silvonei', familia: 'Langenberg', cpfCnpj: '5312312421' },
  { codigo: 2, nome: 'Alex', familia: 'Carpenedo', cpfCnpj: '3123123123' },
  { codigo: 3, nome: 'Fernando', familia: 'Martins', cpfCnpj: '4124124424' },
  { codigo: 4, nome: 'Leonardo', familia: 'Candido', cpfCnpj: '3123123124' },
];

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  displayedColumns = ['codigo', 'nome', 'familia', 'cpfCnpj', 'select'];
  dataSource: MatTableDataSource<Paciente>;
  selection = new SelectionModel<Paciente>(true, []);

  xsWatcherSubscription: Subscription

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private media: MediaObserver
  ) { }

  ngOnInit() {
    this.alterarDisplayColunas();
    this.dataSource = new MatTableDataSource<Paciente>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Métodos para trabalhar com o datasource, paginação e seleção de várias linhas
   */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Paciente): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigo + 1}`;
  }

  /* ------------------------------------------------------------------------------------------ */

  alterarDisplayColunas() {
    this.media.asObservable().pipe(
      filter(() => this.media.isActive('xs'))
    ).subscribe(
      res => {
        const columns = ['codigo', 'nome', 'select'];
        this.displayedColumns = columns;
      }
    );
  }

  onDelete() {
    let texto = 'Tem certeza que deseja remover este paciente ?';
    if (this.selection.selected.length > 1) {
      texto = `Tem certeza que deseja remover estes ${this.selection.selected.length} pacientes ?`;
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: '280px',
      width: '400px',
      data: {
        titulo: 'Remover Paciente',
        texto: texto
      }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(res ? 'Remoção Concluída' : 'Remoção Cancelada');
      },
      err => {
        console.error(err);
      }
    )
  }


}

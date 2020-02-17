import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

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

  displayedColumns: string[] = ['codigo', 'nome', 'familia', 'cpfCnpj', 'select'];
  dataSource: MatTableDataSource<Paciente>;
  selection = new SelectionModel<Paciente>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Paciente>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.selection.selected)
  }

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

}

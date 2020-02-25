import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Paciente } from './../../models/paciente.model';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit, OnDestroy {

  pacientes: Paciente[] = [];

  // Colunas que serão renderizadas na data table do angular material
  displayedColumns = ['idPessoa', 'nome', 'familia', 'cpfCnpj', 'responsavelFamiliar', 'dataNascimento', 'select'];
  // Filtro específico pra cada classe que ele estará sendo trabalhado
  filtroPesquisa: any = [
    { nome: 'Código', valor: 'paciente.idPessoa', typeOnly: 'number' },
    { nome: 'Nome', valor: 'nome', typeOnly: 'string' },
    { nome: 'Família', valor: 'familia.nome', typeOnly: 'string' },
    { nome: 'CPF/CNPJ', valor: 'cpfCnpj', typeOnly: 'string' },
    { nome: 'Responsável', valor: 'responsavelFamiliar', typeOnly: 'boolean' },
    { nome: 'Nascimento', valor: 'dataNascimento', typeOnly: 'Date' },
    { nome: 'Sexo', valor: 'sexo', typeOnly: 'string' },
    { nome: 'Nacionalidade', valor: 'nacionalidade', typeOnly: 'string' },
    { nome: 'Telefone', valor: 'telefone', typeOnly: 'string' },
    { nome: 'Celular', valor: 'celular', typeOnly: 'string' },
    { nome: 'Email', valor: 'email', typeOnly: 'string' },
  ];

  dataSource: MatTableDataSource<Paciente>;
  selection = new SelectionModel<Paciente>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private media: MediaObserver,
    private service: PacientesService
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.alterarDisplayColunasXs();
    this.alterarDisplayColunasSm();
    this.alterarDisplayColunasMd();
    this.alterarDisplayColunasLg();
    this.dataSource = new MatTableDataSource<Paciente>();
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subs => {
        console.log('MediaQuery Destruído');
        subs.unsubscribe();
      }
    );
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idPessoa + 1}`;
  }

  /* ------------------------------------------------------------------------------------------ */

  alterarDisplayColunasXs() {
    const subsXs = this.media.asObservable().pipe(
      filter(() => this.media.isActive('xs'))
    ).subscribe(
      res => {
        const columns = ['idPessoa', 'nome', 'select'];
        this.displayedColumns = columns;
      }
    );

    this.subscriptions.push(subsXs);
  }

  alterarDisplayColunasSm() {
    const subsSm = this.media.asObservable().pipe(
      filter(() => this.media.isActive('sm'))
    ).subscribe(
      res => {
        const columns = ['idPessoa', 'nome', 'familia', 'select'];
        this.displayedColumns = columns;
      }
    );

    this.subscriptions.push(subsSm);
  }

  alterarDisplayColunasMd() {
    const subsMd = this.media.asObservable().pipe(
      filter(() => this.media.isActive('md'))
    ).subscribe(
      res => {
        const columns = ['idPessoa', 'nome', 'familia', 'cpfCnpj', 'select'];
        this.displayedColumns = columns;
      }
    );

    this.subscriptions.push(subsMd);
  }

  alterarDisplayColunasLg() {
    const subsLg = this.media.asObservable().pipe(
      filter(() => this.media.isActive('lg'))
    ).subscribe(
      res => {
        const columns = ['idPessoa', 'nome', 'familia', 'cpfCnpj', 'responsavelFamiliar', 'dataNascimento', 'nacionalidade', 'select'];
        this.displayedColumns = columns;
      }
    );

    this.subscriptions.push(subsLg);
  }

  listarTodos() {
    this.service.listar().subscribe(
      res => {
        this.pacientes = res;
        this.dataSource = new MatTableDataSource<Paciente>(this.pacientes);
        this.dataSource.paginator = this.paginator;
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

  applyFilter(value: string) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

   applyFilterType(column?: string) {
    /* this.dataSource.filterPredicate = (data: Paciente, filter: string) => {
      data.
    } */
  }

}

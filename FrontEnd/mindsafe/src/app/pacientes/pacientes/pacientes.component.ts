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
import { PacienteInfoModalComponent } from '../../shared/paciente-info-modal/paciente-info-modal.component';
import { MensagemService } from '../../shared/mensagem/mensagem.service';

export interface FiltroPaciente {
  nome: string;
  valor: string;
}

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
  filtroPesquisa: FiltroPaciente[] = [
    { nome: 'Código', valor: 'idPessoa' },
    { nome: 'Nome', valor: 'nome' },
    { nome: 'Família', valor: 'familia' },
    { nome: 'CPF/CNPJ', valor: 'cpfCnpj' },
    { nome: 'Nascimento', valor: 'dataNascimento' },
    { nome: 'Nacionalidade', valor: 'nacionalidade' },
    { nome: 'Telefone', valor: 'telefone' },
    { nome: 'Celular', valor: 'celular' },
    { nome: 'Email', valor: 'email' },
  ];

  dataSource: MatTableDataSource<Paciente>;
  selection = new SelectionModel<Paciente>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private media: MediaObserver,
    private service: PacientesService,
    private msg: MensagemService
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
    const subs = this.service.listar().subscribe(
      res => {
        this.pacientes = res;
        this.dataSource = new MatTableDataSource<Paciente>(this.pacientes);
        this.dataSource.paginator = this.paginator;
        this.msg.exibirMensagem('Lista carregada com sucesso', 'done');
      },
      error => {
        this.msg.exibirMensagem('Não foi possível listar os registros', 'error', 2500);
      }
    );

    this.subscriptions.push(subs);
  }

  onInfoPaciente() {
    const dialogRef = this.dialog.open(PacienteInfoModalComponent, {
      height: '550px',
      width: '900px',
      data: {
        paciente: this.selection.selected[0]
      }
    });
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
    );
  }

  /**
   * Método responsável por trazer a lista que havia sido carregada sem nenhuma filtragem
   */
  disabledFilter() {
    this.dataSource = new MatTableDataSource<Paciente>(this.pacientes);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método responsável por aplicar o filtro específico de arrays no javascript
   */
  applyFilter(value: string, coluna?) {
    console.log(`${value} / ${coluna}`);
    let filtrado: Paciente[] = [];
    this.pacientes.map(
      p => {
        if (coluna == 'idPessoa') {
          if (p.idPessoa == Number(value)) {
            filtrado.push(p);
          }
        } else if (coluna == 'nome') {
          // tslint:disable-next-line: max-line-length
          if (p.nome.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            filtrado.push(p);
          }
        } else if (coluna == 'familia') {
          // tslint:disable-next-line: max-line-length
          if (p.familia.nome.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            /* Pode estar ocorrendo um erro ao validar alguns caracteres */
            filtrado.push(p);
          }
        } else if (coluna == 'nacionalidade') {
          // tslint:disable-next-line: max-line-length
          if (p.nacionalidade.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            filtrado.push(p);
          }
        } else if (coluna == 'cpfCnpj') {
          if (p.cpfCnpj.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            filtrado.push(p);
          }
        } else if (coluna == 'dataNascimento') {
          if (p.dataNascimento.toString().indexOf(value) >= 0) {
            filtrado.push(p);
          }
        } else if (coluna == 'telefone') {
          // Colunas não obrigatórias no BD e no Backend devem ser tratadas pra evitar erros de null
          if (p.telefone != null) {
            if (p.telefone.indexOf(value) >= 0) {
              filtrado.push(p);
            }
          }
        } else if (coluna == 'celular') {
          if (p.celular != null) {
            if (p.celular.indexOf(value) >= 0) {
              filtrado.push(p);
            }
          }
        } else if (coluna == 'email') {
          if (p.email != null) {
            if (p.email.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
              filtrado.push(p);
            }
          }
        }
      }
    );
    console.log(filtrado);
    this.dataSource = new MatTableDataSource<Paciente>(filtrado);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = value;
    // filtrado.forEach(v => filtrado.pop());
  }

}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription, EMPTY, Observable } from 'rxjs';
import { filter, tap, switchMap, map } from 'rxjs/operators';

import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ResidenciasService } from '../../services/residencias/residencias.service';
import { Residencia } from './../../models/residencia.model';
// import { ResidenciaInfoModalComponent } from '../../shared/residencia-info-modal/residencia-info-modal.component';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { ResidenciasFormComponent } from '../residencias-form-modal/residencias-form.component';
import { ResidenciasAlterarComponent } from '../residencias-alterar-modal/residencias-alterar.component';
import { ResidenciasInfoModalComponent } from 'src/app/shared/residencias-info-modal/residencias-info-modal.component';

export interface FiltroResidencia {
  nome: string;
  valor: string;
}

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html',
  styleUrls: ['./residencias.component.scss']
})


export class ResidenciasComponent implements OnInit, OnDestroy {

  maskCep = [];

  residencias: Residencia[] = [];

  // Colunas que serão renderizadas na data table do angular material
  displayedColumns = ['idResidencia', 'familia', 'logradouro', 'bairro', 'select'];

  // Filtro específico pra cada classe que ele estará sendo trabalhado
  filtroPesquisa: FiltroResidencia[] = [
    { nome: 'Código', valor: 'idResidencia' },
    { nome: 'Família', valor: 'familia' },
    { nome: 'Logradouro', valor: 'logradouro' },
    { nome: 'Bairro', valor: 'bairro' },

    //não necessário nesta tela, serve para mostrar os filtros no select da tela
    // { nome: 'Micro Area', valor: 'microArea' },
    // { nome: 'CEP', valor: 'cep' },
    // { nome: 'Numero', valor: 'numero' },
    // { nome: 'Local de Referencia', valor: 'localReferencia' },
    // { nome: 'Cor', valor: 'cor' },
    // { nome: 'Complemento', valor: 'complemento' },
  ];

  dataSource: MatTableDataSource<Residencia>;
  selection = new SelectionModel<Residencia>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private media: MediaObserver,
    private service: ResidenciasService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.alterarDisplayColunasXs();
    this.alterarDisplayColunasSm();
    this.alterarDisplayColunasMd();
    this.alterarDisplayColunasLg();
    this.dataSource = new MatTableDataSource<Residencia>();
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

  checkboxLabel(row?: Residencia): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idResidencia + 1}`;
  }

  /* ------------------------------------------------------------------------------------------ */

  alterarDisplayColunasXs() {
    const subsXs = this.media.asObservable().pipe(
      filter(() => this.media.isActive('xs'))
    ).subscribe(
      res => {
        const columns = ['idResidencia', 'familia', 'select'];
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
        const columns = ['idResidencia', 'familia', 'logradouro', 'select'];
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
        const columns = ['idResidencia', 'familia', 'logradouro', 'bairro', 'select'];
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
        const columns = ['idResidencia', 'familia', 'logradouro', 'bairro', 'select'];
        this.displayedColumns = columns;
      }
    );

    this.subscriptions.push(subsLg);
  }

  listarTodos() {
    this.service.listar().subscribe(
      res => {
        this.residencias = res;
        this.dataSource = new MatTableDataSource<Residencia>(this.residencias);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.msg.exibirMensagem('Não foi possível listar os registros', 'error');
      }
    );
  }

  onInfoResidencia() {
    const dialogRef = this.dialog.open(ResidenciasInfoModalComponent, {
      height: '550px',
      width: '900px',
      data: {
        residencia: this.selection.selected[0]
      }
    });
  }

   onVerificarAcao(acao: string) {
    if (acao.toUpperCase() == 'ADD' || acao.toUpperCase() == 'ALTERAR') {
      this.onFormResidencia(acao.toLowerCase());
    } else if (acao.toUpperCase() == 'UPDATE' && this.selection.selected.length > 1) {
      this.onAlterarResidencias();
    }
  }

   onFormResidencia(value: string) {
    const residencia = value == 'alterar' ? this.selection.selected[0] : null;
    if (value) {
      const dialogRef = this.dialog.open(ResidenciasFormComponent, {
        height: '550px',
        width: '900px',
        data: {
          residencia: residencia
        }
      });
    }
  }

   onAlterarResidencias() {
    const dialogRef = this.dialog.open(ResidenciasAlterarComponent, {
      height: '550px',
      width: '900px',
      data: {
        residencia: this.selection.selected
      }
    });
  }

  onDelete() {
    const residencias = this.selection.selected;
    let texto = 'Tem certeza que deseja remover esta residencia ?';
    if (this.selection.selected.length > 1) {
      texto = `Tem certeza que deseja remover estas ${this.selection.selected.length} residencias ?`;
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: '280px',
      width: '400px',
      data: {
        titulo: 'Remover Residencia',
        texto: texto
      }
    });
    this.onDeleteVerify(dialogRef.afterClosed(), residencias);
  }

  /**
   * Método responsável por iterar minha lista de residencias a serem removidos, ele recebe
   * o observable da modal de confirmação que retorna um true ou um false, se retorna false,
   * ele apenas irá executar a primeira verificação, não haverá perda de desempenho
   *
   * É feito um switchMap dentro do método para trocar para o retorno do service que remove
   * o residencia
   *
   * ESTÁ FUNCIONANDO
   */
  onDeleteVerify(subs: Observable<boolean>, residencias: Residencia[]) {
    residencias.forEach(
      p => {
        subs.pipe(
          switchMap((v: boolean) => v ? this.service.remover(p) : EMPTY)
        ).subscribe(
          success => {
            this.msg.exibirMensagem('Removido Com Sucesso', 'done');
            this.listarTodos();
            this.selection.clear();
          },
          err => {
            this.msg.exibirMensagem('Erro ao remover', 'error');
          }
        );
      }
    );
  }

  /**
   * Método responsável por trazer a lista que havia sido carregada sem nenhuma filtragem
   */
  disabledFilter() {
    this.dataSource = new MatTableDataSource<Residencia>(this.residencias);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método responsável por aplicar o filtro específico de arrays no javascript
   */
  applyFilter(value: string, coluna?) {
    console.log(`${value} / ${coluna}`);
    let filtrado: Residencia[] = [];
    this.residencias.map(
      p => {
        if (coluna == 'idResidencia') {
          if (p.idResidencia == Number(value)) {
            filtrado.push(p);
          }
        } else if (coluna == 'familia') {
          // tslint:disable-next-line: max-line-length
          if (p.familia.nome.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            /* Pode estar ocorrendo um erro ao validar alguns caracteres */
            filtrado.push(p);
          }
        } else if (coluna == 'logradouro') {
          if (p.logradouro.trim().toString().toLowerCase().indexOf(value) >= 0) {
            filtrado.push(p);
          }
        } else if (coluna == 'bairro') {
          if (p.microArea.bairro.nome.trim().toString().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
          filtrado.push(p);
         }
        }
      }
    );
    console.log(filtrado);
    this.dataSource = new MatTableDataSource<Residencia>(filtrado);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filter = value;
    // filtrado.forEach(v => filtrado.pop());
  }
}
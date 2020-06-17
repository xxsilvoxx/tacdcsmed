import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, EMPTY } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { MatTableDataSource } from '@angular/material/table';

import { DadosFamiliaModalComponent } from './../dados-familia-modal/dados-familia-modal.component';
import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';
import { AlterarFamiliaModalComponent } from './../alterar-familia-modal/alterar-familia-modal.component';
import { FamiliasFormComponent } from './../familias-form-modal/familias-form-modal.component';
import { PacientesService } from './../../services/pacientes/pacientes.service';
import { FamiliasService } from './../../services/familias/familias.service';
import { Familia } from 'src/app/models/familia.model';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';

interface FiltroFamilia {
  nome: string;
  valor: string;
  tipo: string;
}

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss'],
})
export class FamiliasComponent implements OnInit, OnDestroy {
  familias: Familia[];
  familiasComResponsavel: any[] = [];

  displayedColumns = ['idFamilia', 'nome', 'responsavelFamiliar', 'select'];

  filtroPesquisa: FiltroFamilia[] = [
    { nome: 'Código', valor: 'idFamilia', tipo: 'number' },
    { nome: 'Nome', valor: 'nome', tipo: 'text' },
    { nome: 'Responsável', valor: 'responsavelFamiliar', tipo: 'text' }
  ];

  tipoCampo = 'text';

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private media: MediaObserver,
    private service: FamiliasService,
    private pacienteService: PacientesService,
    private msg: MensagemService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.alterarDisplayColunasXs();
    this.alterarDisplayColunasSm();
    this.alterarDisplayColunasMd();
    this.alterarDisplayColunasLg();
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource.data = this.familiasComResponsavel;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  mudarTipoPesquisa(filtro) {
    this.tipoCampo = filtro.value.tipo;
  }

  /**
   * Métodos para trabalhar com o datasource, paginação e seleção de várias linhas
   */

  isAllSelected() {
    if (this.dataSource.data) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  masterToggle() {
    if (this.dataSource.data) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  checkboxLabel(row?: any): string {
    if (this.dataSource.data) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
        row.familia.idFamilia + 1
        }`;
    }
  }

  /*------------------------------------------------------------------------------------------------------*/

  alterarDisplayColunasXs() {
    const subsXs = this.media
      .asObservable()
      .pipe(filter(() => this.media.isActive('xs')))
      .subscribe((res) => {
        const columns = ['idFamilia', 'nome', 'select'];
        this.displayedColumns = columns;
      });

    this.subscriptions.push(subsXs);
  }

  alterarDisplayColunasSm() {
    const subsSm = this.media
      .asObservable()
      .pipe(filter(() => this.media.isActive('sm')))
      .subscribe((res) => {
        const columns = ['idFamilia', 'nome', 'select'];
        this.displayedColumns = columns;
      });

    this.subscriptions.push(subsSm);
  }

  alterarDisplayColunasMd() {
    const subsMd = this.media
      .asObservable()
      .pipe(filter(() => this.media.isActive('md')))
      .subscribe((res) => {
        const columns = ['idFamilia', 'nome', 'responsavelFamiliar', 'select'];
        this.displayedColumns = columns;
      });

    this.subscriptions.push(subsMd);
  }

  alterarDisplayColunasLg() {
    const subsLg = this.media
      .asObservable()
      .pipe(filter(() => this.media.isActive('lg')))
      .subscribe((res) => {
        const columns = ['idFamilia', 'nome', 'responsavelFamiliar', 'select'];
        this.displayedColumns = columns;

      });

    this.subscriptions.push(subsLg);
  }

  ordenarPorId(a: any, b: any) {
    a = a.familia.idFamilia;
    b = b.familia.idFamilia;
    return a - b;
  }

  listarTodos() {
    this.familiasComResponsavel = [];
    this.service
      .listarTodas()
      .pipe(
        tap((familias) =>
          familias.forEach((familia) => {
            this.pacienteService
              .retornarResponsavelFamiliar(familia)
              .pipe(
                tap((responsavel) => {
                  const obj = {
                    familia,
                    responsavel,
                  };
                  this.familiasComResponsavel.push(obj);
                  this.dataSource.data = this.familiasComResponsavel.sort(this.ordenarPorId);
                })
              )
              .subscribe(
                (success) => success,
                (err) => err
              );
          })
        )
      )
      .subscribe(
        (res) => {
          this.familias = res;
        },
        (err) => err
      );
  }

  abrirJanelaCadastro() {
    const dialogRef = this.dialog.open(FamiliasFormComponent, {
      width: '350px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(
      res => {
        this.selection.clear();
        this.familiasComResponsavel = [];
        this.familias = [];
        this.listarTodos();
      }
    );
  }

  abrirJanelaDados() {
    const dialogRef = this.dialog.open(DadosFamiliaModalComponent, {
      width: '700px',
      height: '550px',
      data: {
        dados: this.selection.selected[0],
      }
    });
  }


  abrirJanelaAlterar() {
    const dialogRef = this.dialog.open(AlterarFamiliaModalComponent, {
      width: '350px',
      height: '350px',
      data: {
        dados: this.selection.selected[0],
      }
    });

    dialogRef.afterClosed().subscribe(
      res => {
        this.selection.clear();
        this.familiasComResponsavel = [];
        this.listarTodos();
      }
    );
  }

  removerFamilias() {
    const dados = this.selection.selected;
    const texto = 'Tem certeza que deseja remover está família ?';

    if (dados.length > 1) {
      this.msg.exibirMensagem('Não é possível remover mais de uma família', 'info');

    } else {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        height: '280px',
        width: '400px',
        data: {
          titulo: 'Remover Família',
          texto
        }
      });
      dialogRef.afterClosed().pipe(
        switchMap(remover => remover ? this.service.remover(dados[0].familia) : EMPTY)
      ).subscribe(
        res => {
          this.msg.exibirMensagem('Família removida com sucesso!', 'done');
          this.selection.clear();
          this.familiasComResponsavel = [];
          this.listarTodos();
        },
        err => {
          this.msg.exibirMensagem('Erro ao remover à família', 'error');
        }
      );
    }
  }

  disabledFilter() {
    this.dataSource = new MatTableDataSource<any>(this.familiasComResponsavel);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Método responsável por aplicar o filtro específico de arrays no javascript
   */
  applyFilter(value: string, coluna?) {
    const filtrado: any[] = [];

    this.familiasComResponsavel.map((p) => {

      if (coluna === 'idFamilia') {
        if (p.familia.idFamilia === Number(value)) {
          filtrado.push(p);
        }
      } else if (coluna === 'nome') {
        // tslint:disable-next-line: max-line-length
        if (
          p.familia.nome
            .trim()
            .toLowerCase()
            .indexOf(value.trim().toLowerCase()) >= 0
        ) {
          /* Pode estar ocorrendo um erro ao validar alguns caracteres */
          filtrado.push(p);
        }
      } else if (coluna === 'responsavelFamiliar') {

        if (p.responsavel != null) {
          if (p.responsavel.nome.trim().toString().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            filtrado.push(p);
          }
        }

      }
    });
    this.dataSource = new MatTableDataSource<any>(filtrado);
    this.dataSource.paginator = this.paginator;
  }
}

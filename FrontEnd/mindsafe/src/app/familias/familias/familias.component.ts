import { FamiliasService } from './../../services/familias/familias.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Familia } from 'src/app/models/familia.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, Observable, EMPTY } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver } from '@angular/flex-layout';
import { MensagemService } from 'src/app/shared/mensagem/mensagem.service';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';

interface FiltroFamilia{
  nome: string;
  valor: string;
  tipo: string;
}

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss']
})

export class FamiliasComponent implements OnInit {

  familias$: Observable<Familia[]>;

  displayedColumns = ['idFamilia', 'nome', 'responsavelFamiliar', 'select'];

  filtroPesquisa: FiltroFamilia[] = [
    { nome: 'Código', valor: 'idFamilia', tipo: 'number' },
    { nome: 'Nome', valor: 'nome', tipo: 'text' },

  ];

  tipoCampo = 'text';

  dataSource: MatTableDataSource<Familia>;
  selection = new SelectionModel<Familia>(true, []);

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private media: MediaObserver,
    private service: FamiliasService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.listarTodos();
    this.alterarDisplayColunasXs();
    this.alterarDisplayColunasSm();
    this.alterarDisplayColunasMd();
    this.alterarDisplayColunasLg();
    this.dataSource = new MatTableDataSource<Familia>();
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subs => subs.unsubscribe()
    );
  }

  mudarTipoPesquisa(filtro) {
    this.tipoCampo = filtro.value.tipo;
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

  checkboxLabel(row?: Familia): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idFamilia + 1}`;
  }



 /*------------------------------------------------------------------------------------------------------*/

 alterarDisplayColunasXs() {
  const subsXs = this.media.asObservable().pipe(
    filter(() => this.media.isActive('xs'))
  ).subscribe(
    res => {
      const columns = ['idFamilia', 'nome', 'select'];
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
      const columns = ['idFamilia', 'nome', 'select'];
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
      const columns = ['idFamilia', 'responsavelFamiliar', 'select'];
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
      const columns = ['idFamilia', 'nome','responsavelFamiliar', 'select'];
      this.displayedColumns = columns;
    }
  );

  this.subscriptions.push(subsLg);
}

listarTodos() {
  this.familias$ = this.service.listarTodas();

}

/**onInfoPaciente() {
  const dialogRef = this.dialog.open(FamiliaInfoModalComponent, {
    height: '550px',
    width: '900px',
    data: {
      familia: this.selection.selected[0]
    }
  });
}

onVerificarAcao(acao: string) {
  if (acao == 'alterar' && this.selection.selected.length > 1) {
    this.onAlterarFamilia();
  } else if (acao == 'add' || acao == 'alterar') {
    this.onFormFamilia(acao.toLowerCase());
  }
}

onFormFamilia(value: string) {
  const familiaSelecionado = value == 'alterar' ? this.selection.selected[0] : null;
  if (value) {
    const dialogRef = this.dialog.open(FamiliasFormComponent, {
      height: '550px',
      width: '900px',
      data: {
        familia: familiaSelecionado
      }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        this.listarTodos();
        this.selection.clear();
      }
    );
  }
}

onAlterarFamilia() {
  const dialogRef = this.dialog.open(FamiliasAlterarComponent, {
    height: '550px',
    width: '900px',
    data: {
      familias: this.selection.selected
    }
  });
  dialogRef.afterClosed().subscribe(
    res => {
      this.selection.clear();
    }
  );
} */

/* onDelete() {
  const pacientes = this.selection.selected;
  let texto = 'Tem certeza que deseja remover está família ?';
  if (this.selection.selected.length > 1) {
    texto = `Tem certeza que deseja remover estas ${this.selection.selected.length} famílias ?`;
  }
  const dialogRef = this.dialog.open(ConfirmModalComponent, {
    height: '280px',
    width: '400px',
    data: {
      titulo: 'Remover Familia',
      texto: texto
    }
  });
  this.onDeleteVerify(dialogRef.afterClosed(), this.familias);
} */

/**
 * Método responsável por iterar minha lista de familias a serem removidos, ele recebe
 * o observable da modal de confirmação que retorna um true ou um false, se retorna false,
 * ele apenas irá executar a primeira verificação, não haverá perda de desempenho
 *
 * É feito um switchMap dentro do método para trocar para o retorno do service que remove
 * a familia
 *
 * ESTÁ FUNCIONANDO
 */
onDeleteVerify(subs: Observable<boolean>, familias: Familia[]) {
  familias.forEach(
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
/* disabledFilter() {
  this.dataSource = new MatTableDataSource<Familia>(this.familias);
  this.dataSource.paginator = this.paginator;
} */

/**
 * Método responsável por aplicar o filtro específico de arrays no javascript
 */
  /* applyFilter(value: string, coluna?) {
    const filtrado: Familia[] = [];
    this.familias.map(
      p => {
        if (coluna === 'idFamilia') {
          if (p.idFamilia === Number(value)) {
            filtrado.push(p);
          }
        } else if (coluna === 'nome') {
          if (p.nome.trim().toLowerCase().indexOf(value.trim().toLowerCase()) >= 0) {
            filtrado.push(p);
          }
        }
      }
    );
    console.log(filtrado);
    this.dataSource = new MatTableDataSource<Familia>(filtrado);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = value;
    // filtrado.forEach(v => filtrado.pop());
  } */
}

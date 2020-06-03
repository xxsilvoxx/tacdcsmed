import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { Funcionario } from '../../../models/funcionario.model';
import { FuncionariosService } from '../../../services/funcionarios/funcionarios.service';
import { ImagensService } from '../../../services/imagens/imagens.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-vizualizar-funcionarios',
  templateUrl: './vizualizar-funcionarios.component.html',
  styleUrls: ['./vizualizar-funcionarios.component.scss']
})
export class VizualizarFuncionariosComponent implements OnInit {

  grupoLista: any[] = [];

  constructor(
    private dialog: MatDialog,
    private service: FuncionariosService,
    private img: ImagensService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  buscarImagem(funcionario: Funcionario) {
    return this.img.buscarImg(funcionario);
  }

  listarTodos() {
    this.service.listarTodos().pipe(
      tap(funcionarios => funcionarios.forEach(f => {
        const registro = this.grupoLista.filter(v => v.nome === f.ubs.nome);
        if (registro.length > 0) {
          registro[0].registros.push(f);
        } else {
          let obj = {
            nome: f.ubs.nome,
            registros: [] as Funcionario[]
          };
          obj.registros.push(f);
          this.grupoLista.push(obj);
        }
      }))
    ).subscribe(
      success => success,
      err => err
    );
  }

  onDelete(funcionario: Funcionario) {
    this.service.retornarTotalVisitas(funcionario).pipe(
      switchMap(res => res === 0
        ? this.dialog.open(ConfirmModalComponent, {
          height: '320px',
          width: '350px',
          data: {
            titulo: 'Remover Funcionário',
            texto: 'Tem certeza que deseja remover este funcionário ?',
            icone: 'warning',
            textoAdicional: 'Este funcionário não poderá mais acessar o sistema, perderá todos os benefícios'
          }
        }).afterClosed()
        : (this.msg.exibirMensagem('Este funcionário não pode ser removido', 'warning'), EMPTY)
      ),
      switchMap(res => res ? this.service.remover(funcionario) : EMPTY)
    ).subscribe(
      success => {
        this.grupoLista = [];
        this.listarTodos();
        this.msg.exibirMensagem('Funcionário removido com sucesso', 'done');
      },
      err => this.msg.exibirMensagem('Erro ao remover o funcionário', 'error')
    );
  }

}

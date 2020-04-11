import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { Funcao } from '../../../models/funcao.model';
import { FuncoesService } from '../../../services/funcoes/funcoes.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { funcaoDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { element } from 'protractor';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-vizualizar-funcoes',
  templateUrl: './vizualizar-funcoes.component.html',
  styleUrls: ['./vizualizar-funcoes.component.scss']
})
export class VizualizarFuncoesComponent implements OnInit {

  funcoes: Funcao[] = [];
  funcoesTot: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<VizualizarFuncoesComponent>,
    private dialog: MatDialog,
    private service: FuncoesService,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.listarFuncoes();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  listarFuncoes() {
    this.service.listar().pipe(
      tap(funcoes => funcoes.forEach(
        funcao => {
          this.service.retornarTotalFuncionarios(funcao).pipe(
            tap(total => {
              const obj = {
                funcao: this.builder.group({
                  idFuncao: [funcao.idFuncao],
                  nome: [funcao.nome, {
                    validators: [
                      Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(250)
                    ],
                    asyncValidators: [
                      funcaoDisponivelValidator(this.service)
                    ]
                  }]
                }),
                totFuncionarios: total
              };
              this.funcoesTot.push(obj);
            })
          ).subscribe(
            success => success,
            err => err
          );
        }
      ))
    ).subscribe(
      res => {
        if (res.length === 0) {
          this.msg.exibirMensagem('A lista de funções está vazia', 'info');
        }
        this.funcoes = res;
      },
      err => this.msg.exibirMensagem('Erro ao trazer as funções', 'error')
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  onDelete(element: any) {
    if (element.totFuncionarios > 0) {
      this.msg.exibirMensagem('Você não pode remover esta função', 'warning')
      .afterDismissed().subscribe(
        res => this.msg.exibirMensagem('Você deve alterar a função do(s) funcionário(s) para outra primerio', 'info', 4000)
      );
    } else {
      const dialogRemove = this.dialog.open(ConfirmModalComponent, {
        height: '300px',
        width: '350px',
        data: {
          titulo: 'Remover Função',
          texto: 'Tem certeza que deseja remover esta função ?'
        }
      });
      dialogRemove.afterClosed().pipe(
        switchMap(res => res ? this.service.remover(element.funcao.value) : EMPTY)
      ).subscribe(
        success => {
          const index = this.funcoesTot.indexOf(element);
          this.funcoesTot.splice(index, 1);
          this.msg.exibirMensagem('Função removida com sucesso', 'done');
        },
        err => this.msg.exibirMensagem('Erro ao remover a função', 'error')
      );
    }
  }

  onUpdate(funcao: Funcao) {
    this.service.alterar(funcao).subscribe(
      success => {
        this.msg.exibirMensagem('Função alterada com sucesso', 'done');
        this.dialogRef.close();
      }
    );
  }

}

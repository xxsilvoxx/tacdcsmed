
import { tap, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Ubs } from '../../../models/ubs.model';
import { UbsService } from '../../../services/ubs/ubs.service';
import { ubsDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-vizualizar-ubs',
  templateUrl: './vizualizar-ubs.component.html',
  styleUrls: ['./vizualizar-ubs.component.scss']
})
export class VizualizarUbsComponent implements OnInit {

  ubs: Ubs[];
  ubsTot: any[] = [];

  constructor(
    private dialog: MatDialog,
    private service: UbsService,
    private builder: FormBuilder,
    private valdiation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.listarUbs();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.valdiation.getErrorMessage(control, label);
  }

  listarUbs() {
    this.service.listar().pipe(
      tap(ubsList => ubsList.forEach(
        ubs => {
          this.service.retornarTotalFuncionarios(ubs).pipe(
            tap(totFunc => {
              this.service.retornarTotalBairros(ubs).pipe(
                tap(totBairro => {
                  const obj = {
                    ubs: this.builder.group({
                      idUbs: [ubs.idUbs],
                      nome: [ubs.nome, {
                        validators: [
                          Validators.minLength(5),
                          Validators.maxLength(250),
                          Validators.required
                        ]
                      }],
                      descricao: [ ubs.descricao, {
                        validators: [
                          Validators.minLength(5),
                          Validators.maxLength(150),
                          Validators.required
                        ]
                      }]
                    }),
                    totFuncionarios: totFunc,
                    totBairros: totBairro
                  };
                  this.ubsTot.push(obj);
                })
              ).subscribe(
                success => success,
                err => err
              );
            })
          ).subscribe(
            success => success,
            err => err
          );
        }
      ))
    ).subscribe(
      res => this.ubs = res,
      err => err
    );
  }

  onDelete(element: any) {
    if (element.totFuncionarios > 0 || element.totBairros > 0) {
      this.msg.exibirMensagem('Não é possível remover esta UBS', 'warning').afterDismissed(
      ).subscribe(
        // tslint:disable-next-line: max-line-length
        res => this.msg.exibirMensagem('Você deve alterar a UBS de todos os funcionários primeiro, e dos bairros que ela atende', 'info', 5000)
      );
    } else {
      const dialogRemove = this.dialog.open(ConfirmModalComponent, {
        height: '280px',
        width: '450px',
        data: {
          titulo: 'Remover UBS',
          texto: 'Tem certeza que deseja remover esta UBS ?'
        }
      });
      dialogRemove.afterClosed().pipe(
        switchMap(res => res ? this.service.remover(element.ubs.value) : EMPTY)
      ).subscribe(
        success => {
          const index = this.ubsTot.indexOf(element);
          this.ubsTot.splice(index, 1);
          this.msg.exibirMensagem('UBS removida com sucesso', 'done');
        },
        err => this.msg.exibirMensagem('Erro ao remover a UBS', 'error')
      );
    }
  }

  onUpdate(ubs: Ubs) {
    this.service.alterar(ubs).subscribe(
      success => this.msg.exibirMensagem('UBS alterada com sucesso', 'error'),
      err => this.msg.exibirMensagem('Erro ao alterar a UBS', 'error')
    );
  }

  atribuirValidacaoAssincrona(control: FormControl) {
    control.setAsyncValidators(ubsDisponivelValidator(this.service));
  }

}

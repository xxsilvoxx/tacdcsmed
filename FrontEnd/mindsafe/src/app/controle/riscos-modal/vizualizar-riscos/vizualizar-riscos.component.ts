import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

import { Causa } from '../../../models/causa.model';
import { CausasService } from '../../../services/causas/causas.service';
import { tap, switchMap } from 'rxjs/operators';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { causaDisponivelValidator, validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { element } from 'protractor';

@Component({
  selector: 'app-vizualizar-riscos',
  templateUrl: './vizualizar-riscos.component.html',
  styleUrls: ['./vizualizar-riscos.component.scss']
})
export class VizualizarRiscosComponent implements OnInit {

  riscos: Causa[] = [];
  riscosTot: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<VizualizarRiscosComponent>,
    private dialog: MatDialog,
    private service: CausasService,
    private builder: FormBuilder,
    private validation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.listarRiscos();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  listarRiscos() {
    this.service.listarCausas().pipe(
      tap(causas => causas.forEach(
        causa => {
          this.service.retornarTotalPacientes(causa).pipe(
            tap(total => {
              const obj = {
                causa: this.builder.group({
                  idCausa: [causa.idCausa],
                  nome: [causa.nome, {
                    validators: [
                      Validators.minLength(5),
                      Validators.maxLength(250),
                      Validators.required
                    ]
                  }],
                  risco: [causa.risco, {
                    validators: [
                      validarNumeroMinimo.bind(this),
                      Validators.required
                    ]
                  }]
                }),
                totPacientes: total
              };
              this.riscosTot.push(obj);
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
          this.msg.exibirMensagem('Lista de riscos está vazia', 'info');
        }
        this.riscos = res;
      },
      err => this.msg.exibirMensagem('Erro ao buscar os riscos', 'error')
    );
  }

  onDelete(element: any) {
    let icon = null;
    let adicional = null;
    if (element.totPacientes > 0) {
      icon = 'warning';
      adicional = 'Os pacientes com essa causa serão afetados com a exclusão';
    }
    const dialogRemove = this.dialog.open(ConfirmModalComponent, {
      height: element.totPacientes > 0 ? '350px' : '280px',
      width: '400px',
      data: {
        titulo: 'Remover Risco',
        texto: 'Tem certeza que deseja remover este risco ?',
        icone: icon,
        textoAdicional: adicional
      }
    });
    dialogRemove.afterClosed().pipe(
      switchMap(res => res ? this.service.removerCausa(element.causa.value) : EMPTY)
    ).subscribe(
      success => {
        const index = this.riscosTot.indexOf(element);
        this.riscosTot.splice(index, 1);
        this.msg.exibirMensagem('Risco removido com sucesso', 'done');
      },
      err => this.msg.exibirMensagem('Erro ao remover o risco', 'error')
    );
  }

  onUpdate(causa: Causa) {
    this.service.alterarCausa(causa).subscribe(
      success => this.msg.exibirMensagem('Risco alterado com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao alterar o risco', 'error')
    );
  }

  atribuirValidadorAssincrono(control: FormControl) {
    control.setAsyncValidators(causaDisponivelValidator(this.service));
  }

}

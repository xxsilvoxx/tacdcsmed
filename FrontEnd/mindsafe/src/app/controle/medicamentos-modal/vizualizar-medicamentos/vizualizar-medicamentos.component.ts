import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/medicamento.model';
import { MedicamentoPessoaService } from '../../../services/medicamentoPessoa/medicamento-pessoa.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { medicamentoDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { element } from 'protractor';

@Component({
  selector: 'app-vizualizar-medicamentos',
  templateUrl: './vizualizar-medicamentos.component.html',
  styleUrls: ['./vizualizar-medicamentos.component.scss']
})
export class VizualizarMedicamentosComponent implements OnInit {

  medicamentos: Medicamento[] = [];
  medicamentosTot: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<VizualizarMedicamentosComponent>,
    private dialog: MatDialog,
    private builder: FormBuilder,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private medicamentosService: MedicamentosService,
    private medicamentoPessoaService: MedicamentoPessoaService
  ) { }

  ngOnInit() {
    this.listarMedicamentos();
  }

  retornarValidacoes(campo: FormControl, label: string) {
    return this.validation.getErrorMessage(campo, label);
  }

  listarMedicamentos() {
    this.medicamentosService.listarMedicamentos().pipe(
      tap(
        v => v.forEach(
          c => {
            this.medicamentoPessoaService.retornarTotalDependentes(c).pipe(
              tap(res => {
                const obj = {
                  medicamento: this.builder.group({
                    idMedicamento: [c.idMedicamento],
                    nome: [c.nome, {
                      validators: [
                        Validators.maxLength(250)
                      ],
                      asyncValidators: [
                        medicamentoDisponivelValidator(this.medicamentosService)
                      ]
                    }]
                  }),
                  totalDependentes: res
                };
                this.medicamentosTot.push(obj);
              })
            ).subscribe(
              success => success,
              err => err
            );
          }
        )
      )
    ).subscribe(
      res => {
        this.medicamentos = res;
      },
      err => this.msg.exibirMensagem('Erro ao trazer os medicamentos', 'error')
    );
  }

  onDelete(element: any) {
    let texto = null;
    if (element.totalDependentes) {
      texto = `Os pacientes que consomem este medicamento, serão afetados`;
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: element.totalDependentes > 0 ? '340px' : '300px',
      width: '400px',
      data: {
        titulo: 'Remover Medicamento',
        texto: 'Tem certeza que deseja remover este medicamento ?',
        icone: 'warning',
        textoAdicional: texto
      }
    });
    dialogRef.afterClosed().pipe(
      switchMap(v => v
        ? this.medicamentosService.removerMedicamento(element.medicamento.value)
        : EMPTY
      )
    ).subscribe(
      success => {
        const index = this.medicamentosTot.indexOf(element);
        this.medicamentosTot.splice(index, 1);
        this.msg.exibirMensagem('Medicamento removido com successo', 'done');
      },
      err => this.msg.exibirMensagem('Erro ao remover o medicamento', 'error')
    );
  }

  onUpdate(medicamento: Medicamento) {
    this.medicamentosService.alterarMedicamento(medicamento).subscribe(
      success => this.msg.exibirMensagem('Medicamento alterado com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao alterar o medicamento', 'error')
    );
  }

}

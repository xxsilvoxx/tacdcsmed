import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-vizualizar-medicamentos',
  templateUrl: './vizualizar-medicamentos.component.html',
  styleUrls: ['./vizualizar-medicamentos.component.scss']
})
export class VizualizarMedicamentosComponent implements OnInit {

  medicamentos: Medicamento[] = [];
  totalDependentes: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<VizualizarMedicamentosComponent>,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private medicamentosService: MedicamentosService,
    private medicamentoPessoaService: MedicamentoPessoaService,
    private dialog: MatDialog
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
                  medicamento: new FormControl(c, {
                    validators: [ Validators.maxLength(250) ],
                    asyncValidators: [ medicamentoDisponivelValidator(this.medicamentosService) ]
                  }),
                  codigo: c.idMedicamento,
                  total: res
                };
                this.totalDependentes.push(obj);
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

  removerMedicamento(medicamento: Medicamento, totalDependentes = 0) {
    let texto = null;
    if (totalDependentes) {
      texto = `${totalDependentes} paciente(s) utiliza(m) este medicamento !`;
    }
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      height: '280px',
      width: '400px',
      data: {
        titulo: 'Remover Medicamento',
        texto: 'Tem certeza que deseja remover este medicamento ?',
        icone: 'warning',
        textoAdicional: texto
      }
    });
    dialogRef.afterClosed().pipe(
      switchMap(v => v ? this.medicamentosService.removerMedicamento(medicamento) : EMPTY)
    ).subscribe(
      success => {
        this.msg.exibirMensagem('Medicamento removido com successo', 'done');
      },
      err => this.msg.exibirMensagem('Erro ao remover o medicamento', 'error')
    );
  }

  alterarMedicamento(nome: string, codigo: number) {
    const alterado = new Medicamento();
    alterado.nome = nome;
    alterado.idMedicamento = codigo;
    this.medicamentosService.alterarMedicamento(alterado).subscribe(
      success => this.msg.exibirMensagem('Medicamento alterado com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao alterar o medicamento', 'error')
    );
  }

}

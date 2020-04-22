import { Component, OnInit } from '@angular/core';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { MicroArea } from '../../../models/microArea.model';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { tap, switchMap } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { microareaDisponivelValidator, validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { element } from 'protractor';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { EMPTY, Observable } from 'rxjs';
import { Bairro } from '../../../models/bairro.model';
import { BairrosService } from '../../../services/bairros/bairros.service';
import { Ubs } from '../../../models/ubs.model';
import { UbsService } from '../../../services/ubs/ubs.service';

@Component({
  selector: 'app-vizualizar-microareas',
  templateUrl: './vizualizar-microareas.component.html',
  styleUrls: ['./vizualizar-microareas.component.scss']
})
export class VizualizarMicroareasComponent implements OnInit {

  microareas: MicroArea[] = [];
  microareasTot: any[] = [];
  bairros: Bairro[];
  ubs: Ubs[];

  constructor(
    private dialogRef: MatDialogRef<VizualizarMicroareasComponent>,
    private dialog: MatDialog,
    private builder: FormBuilder,
    private microAreasService: MicroAreasService,
    private bairrosService: BairrosService,
    private ubsService: UbsService,
    private msg: MensagemService,
    private validation: MensagemValidationService
  ) { }

  ngOnInit() {
    this.listarMicroAreas();
    this.listarBairros();
    this.listarUbs();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  listarMicroAreas() {
    this.microAreasService.listarTodas().pipe(
      tap(microareasList => microareasList.forEach(
        microarea => {
          this.microAreasService.retornarTotalPacientes(microarea).pipe(
            tap(totalPacientes => {
              this.microAreasService.retornarAcsResponsavel(microarea).pipe(
                tap(funcionario => {
                  const obj = {
                    microarea: this.builder.group({
                      idMicroArea: [ microarea.idMicroArea ],
                      numero: [ microarea.numero, {
                        validators: [ validarNumeroMinimo.bind(this) ]
                      }],
                      bairro: [ microarea.bairro.nome ]
                    }),
                    ubs: this.builder.group({
                      idUbs: [ microarea.bairro.ubs.idUbs ],
                      nome: [ microarea.bairro.ubs.nome, {
                        validators: [ Validators.required ]
                      }],
                      descricao: [ microarea.bairro.ubs.descricao ]
                    }),
                    totPacientes: totalPacientes,
                    funcionarioResponsavel: funcionario
                  };
                  this.microareasTot.push(obj);
                })
              ).subscribe(
                success => success,
                err => err
              );
            }),
          ).subscribe(
            success => success,
            err => err
          );
        }
      )),
    ).subscribe(
      res => {
        if (res.length === 0) {
          this.msg.exibirMensagem('A lista de microáreas está vazia', 'info');
        }
        this.microareas = res;
      },
      err => this.msg.exibirMensagem('Erro ao retornar microáreas', 'error')
    );
  }

  listarBairros() {
    this.bairrosService.listarTodos().subscribe(
      res => this.bairros = res,
      err => err
    );
  }

  listarUbs() {
    this.ubsService.listar().subscribe(
      res => this.ubs = res,
      err => err
    );
  }

  onRemove(element: any) {
    if (element.totPacientes > 0) {
      this.msg.exibirMensagem('A microárea possui pacientes, não pode ser removida', 'warning').afterDismissed().subscribe(
        // tslint:disable-next-line: max-line-length
        res => this.msg.exibirMensagem('Altere as microáreas das residências dos pacientes, para poder remover esta microárea', 'info', 5000)
      );
    } else {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        height: '280px',
        width: '350px',
        data: {
          titulo: 'Remover Microárea',
          texto: 'Tem certeza que deseja remover está Microárea ?'
        }
      });
      dialogRef.afterClosed().pipe(
        switchMap(res => res
          ? this.microAreasService.removerMicroarea(element.microarea.value)
          : EMPTY)
      ).subscribe(
        success => {
          this.msg.exibirMensagem('Microárea removida com sucesso', 'done');
          const index = this.microareasTot.indexOf(element);
          this.microareasTot.splice(index, 1);
        },
        err => this.msg.exibirMensagem('Erro ao remover a microárea', 'error')
      );
    }
  }

  /**
   * Método que altera o registro da microárea.
   */
  onUpdate(element: any) {
    const microarea = element.microarea.value as MicroArea;
    const novaUbs = this.ubs.filter(u => u.nome === element.ubs.value.nome);
    const bairro = this.bairros.filter(b => b.nome === element.microarea.get('bairro').value);
    microarea.bairro = bairro[0];
    microarea.bairro.ubs = novaUbs[0];
    this.bairrosService.alterar(microarea.bairro).pipe(
      switchMap(b => b
        ? (microarea.bairro = b, this.microAreasService.alterarMicroarea(microarea))
        : EMPTY
      )
    ).subscribe(
      success => this.msg.exibirMensagem('Microárea alterada com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao alterar a microárea', 'error')
    );
  }

  /**
   * Pra evitar do usuário não poder alterar somente o bairro da microárea
   * foi criado o método quje adiciona a validação, somente quando o campo
   * de número da microárea é alterado.
   */
  atribuirValidadorAssincrono(control: FormControl) {
    /* control.setAsyncValidators(microareaDisponivelValidator(this.microAreasService)); */
  }
}

import { Component, OnInit } from '@angular/core';
import { MicroAreasService } from '../../../services/microAreas/microArea.service';
import { MicroArea } from '../../../models/microArea.model';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { tap, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { microareaDisponivelValidator, validarNumeroMinimo } from '../../../shared/mensagem-validation/form-validations';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-vizualizar-microareas',
  templateUrl: './vizualizar-microareas.component.html',
  styleUrls: ['./vizualizar-microareas.component.scss']
})
export class VizualizarMicroareasComponent implements OnInit {

  microareas: MicroArea[] = [];
  microareasTot: any[] = [];

  constructor(
    private microAreasService: MicroAreasService,
    private msg: MensagemService,
    private validation: MensagemValidationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listarMicroAreas();
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
                    microarea: new FormControl(microarea, {
                      validators: [ validarNumeroMinimo.bind(this) ]
                    }),
                    bairro: microarea.bairro,
                    codigo: microarea.idMicroArea,
                    pacientes: totalPacientes ? totalPacientes : 0,
                    responsavel: funcionario
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
      res => this.microareas = res,
      err => this.msg.exibirMensagem('Erro ao retornar microáreas', 'error')
    );
  }

  onRemove(element: any) {
    if (element.pacientes > 0) {
      this.msg.exibirMensagem('Microárea possui pacientes, não pode ser removida', 'warning').afterDismissed().subscribe(
        res => this.msg.exibirMensagem('Altere as microáreas das residências dos pacientes', 'info')
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
    let microarea: MicroArea;
    // caso tenha sido alterado o número, cai nesse if.
    if (typeof element.microarea.value === 'number') {
      microarea = new MicroArea();
      microarea.bairro = element.bairro;
      microarea.idMicroArea = element.codigo;
      microarea.numero = element.microarea.value;
      // Caso contrário, cai nesse.
    } else {
      microarea = element.microarea.value;
    }
    this.microAreasService.alterarMicroarea(microarea).subscribe(
      success => this.msg.exibirMensagem('Microárea alterada com sucesso', 'done'),
      err => this.msg.exibirMensagem('Erro ao alterar a microárea', 'error')
    );
  }

  atribuirValidator(control: FormControl) {
    control.setAsyncValidators(microareaDisponivelValidator(this.microAreasService));
  }

}

import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { Visita } from './../../models/visita.model';
import { FormVisitasComponent } from './../form-visitas/form-visitas.component';
import { VisitaService } from './../../services/visitas/visita.service';
import { CausasService } from '../../services/causas/causas.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  visitas: Visita[];
  visitasConcluidas: any[] = [];
  visitasPendentes = [
    { nome: 'pendentes', visitas: [] as any[] },
    { nome: 'atrasados', visitas: [] as any[] },
  ];

  listStatus = {
    concluida: {
      mensagem: 'CONCLUÍDA',
      icone: 'check_circle_outline',
      cor: '#059D00'
    },
    pendente: {
      mensagem: 'PENDENTE',
      icone: 'warning',
      cor: '#E1B503'
    },
    atrasada: {
      mensagem: 'ATRASADA',
      icone: 'error_outline',
      cor: '#D60000'
    }
  };

  constructor(
    private visitaService: VisitaService,
    private dialog: MatDialog,
    private msg: MensagemService,
    private causasService: CausasService
  ) { }

  ngOnInit() {
    this.listarVisitas();
  }

  /**
   * # Método responsável por listar todas as visitas cadastradas
   * O método trata se a visita é:
   * - Concluída
   * - Pendente
   * - Atrasada
   */
  listarVisitas() {
    this.visitaService.listarVisitas().pipe(
      tap(visitas => visitas.forEach(
        visita => {
          // Listagem de cores de acordo com a estratificação;
          const colors = {
            semRisco: '#000ED5',
            riscoBaixo: '#059E1A',
            riscoMedio: '#C2BF00',
            riscoGrave: '#B40000'
          };
          this.causasService.retornarSomatorioRiscosPaciente(visita.pessoa).pipe(
            tap(somatorio => {

              // Valida o somatório para atribuir que cor o circulo,
              // que se refere ao risco do paciente, irá receber.
              let riscoPaciente = colors.semRisco;
              if (somatorio >= 6) {
                riscoPaciente = colors.riscoBaixo;
              } else if (somatorio >= 11) {
                riscoPaciente = colors.riscoMedio;
              } else if (somatorio >= 16) {
                riscoPaciente = colors.riscoGrave;
              }

              // Objeto genérico que armazena a visita e a cor que irá exibir
              // no circulo da listagem.
              const registro = {
                visita: visita as Visita,
                risco: riscoPaciente
              };

              // Verificação para saber se a visita está concluída, pendente
              // ou atrasada para separar cada objeto da interação para sua
              // respectiva lista.
              if (visita.status === this.listStatus.concluida.mensagem) {
                registro.visita.status = this.listStatus.concluida;
                this.visitasConcluidas.push(registro);
              } else if (visita.status === this.listStatus.pendente.mensagem) {
                registro.visita.status = this.listStatus.pendente;
                this.visitasPendentes[0].visitas.push(registro);
              } else if (visita.status === this.listStatus.atrasada.mensagem) {
                registro.visita.status = this.listStatus.atrasada;
                this.visitasPendentes[1].visitas.push(registro);
              }
            })
          ).subscribe(
            success => success,
            err => err
          );
        }
      ))
    ).subscribe(
      res => this.visitas = res,
      err => this.msg.exibirMensagem('Erro ao buscar as visitas', 'error')
    );
  }

  limparVisitas() {
    this.visitas.forEach(v => this.visitas.pop());
    this.visitasConcluidas.forEach(v => this.visitas.pop());
    this.visitasPendentes.forEach(v => {
      v.visitas.forEach(valor => v.visitas.pop());
    });
  }

  openModal(visita?: Visita) {
    let dialogRef: MatDialogRef<FormVisitasComponent> = null;
    if (visita) {
      dialogRef = this.dialog.open(FormVisitasComponent, {
        height: '500px',
        width: '400px',
        data: {
          dados: visita
        }
      });
    } else {
      dialogRef = this.dialog.open(FormVisitasComponent, {
        height: '550px',
        width: '450px',
      });
    }

    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.limparVisitas();
          this.listarVisitas();
        }
      }
    );
  }

}

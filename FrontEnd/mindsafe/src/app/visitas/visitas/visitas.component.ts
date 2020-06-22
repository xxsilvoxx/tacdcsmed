import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { Visita } from './../../models/visita.model';
import { FormVisitasComponent } from './../form-visitas/form-visitas.component';
import { VisitaService } from './../../services/visitas/visita.service';
import { CausasService } from '../../services/causas/causas.service';
import { Paciente } from '../../models/paciente.model';
import { EMPTY } from 'rxjs';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  // Listas referentes as visitas concluídas, pendentes ou atrasadas
  visitas: Visita[];
  visitasConcluidas: any[] = [];

  funcionario: Funcionario;

  // A lista de pendentes tem dois subtipos que são
  // pendentes e atrasados
  visitasPendentes = [
    { nome: 'pendentes', visitas: [] as any[] },
    { nome: 'atrasados', visitas: [] as any[] },
  ];

  // Armazena todos os pacientes cadastrados que possuem visitas
  // é utilizada pra não repetir o somatorio de riscos.
  pacientes: Paciente[] = [];

  // Objeto que contem a mensagem do status, icone e a cor
  // é utilizado para exibir os componentes na tela.
  listStatus = {
    concluida: {
      mensagem: 'CONCLUIDA',
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
    private funcionarioService: FuncionariosService,
    private dialog: MatDialog,
    private msg: MensagemService,
    private causasService: CausasService
  ) { }

  ngOnInit() {
    this.funcionario = this.funcionarioService.buscarFuncionarioSalvo();
    this.listarVisitas();
  }

  /**
   * # Método responsável por listar todas as visitas cadastradas
   * O método trata se a visita é:
   * ----
   * - Concluída
   * - Pendente
   * - Atrasada
   */
  listarVisitas() {

    // Sempre que chama o método, ele apaga todas as
    // listas para preencher-las novamente.
    this.visitas = [];
    this.visitasConcluidas = [];
    this.visitasPendentes.forEach(v => {
      v.visitas = [];
    });
    this.visitaService.listarVisitasPorMicroarea(this.funcionario.microArea).pipe(

      // Tap utilizado para atualizar a lista, antes mesmo de ela ser renderizada,
      // jogando visitas pendentes que já expiraram para atrasadas.
      /* tap(visitas => visitas.forEach(
        visita => {
          const dataVisita = new Date(visita.dataVisita);
          const dataAtual = new Date();

          // Verifica se a data da visita é anterior a data atual.
          if (dataVisita < dataAtual) {
            if (visita.status === this.listStatus.pendente.mensagem) {
              visita.status = this.listStatus.atrasada.mensagem;
              this.visitaService.atualizarVisita(visita).subscribe(
                success => success,
                err => err
              );
            }
          }
        }
      )), */

      // Tap utilizado para separar todos os pacientes que
      // possuem visitas, assim evitando de fazer chamadas
      // desnecessárias ao servidor.
      tap(visitas => visitas.forEach(
        visita => {
          if (this.pacientes.map(v => v.idPessoa).indexOf(visita.pessoa.idPessoa) < 0) {
            this.pacientes.push(visita.pessoa);
          }
        }
      )),

      // Tap utilizado para iterar cada paciente, buscando o
      // somatório de riscos, e atribuindo a cor de acordo com
      // o risco.
      tap((visitas) => visitas
        ? this.pacientes.forEach(paciente => {
          this.causasService.retornarSomatorioRiscosPaciente(paciente).pipe(
            tap(somatorio => {

              // Lista todas as visitas para assim atribuir
              // cada visita em sua respectiva lista.
              this.visitaService.listarVisitasPorMicroarea(this.funcionario.microArea).subscribe(
                // tslint:disable-next-line: no-shadowed-variable
                visitas => visitas.forEach(
                  visita => {

                    // Compara se a visita passada tem o mesmo paciente da iteração
                    // assim já aplicando o valor do somatorio de riscos para veri-
                    // ficar a cor que será exibida ao lado do mesmo.
                    if (visita.pessoa.idPessoa === paciente.idPessoa) {
                      const registro = {
                        visita: visita as Visita,
                        risco: this.verificarRiscoPaciente(somatorio)
                      };
                      this.separarListagens(registro);
                    }
                  }
                ),
                err => err
              );
            }),
          ).subscribe(
            success => success,
            err => err
          );
        })
        : EMPTY
      )
    ).subscribe(
      res => this.visitas = res,
      err => this.msg.exibirMensagem('Erro ao buscar as visitas', 'error')
    );
  }

  // Ordena a lista de visitas pegando como
  // base a data da visita, ordenando de forma
  // decrescente.
  ordenarPorDataDecrescente(a: any, b: any) {
    a = a.visita.dataVisita as Date;
    b = b.visita.dataVisita as Date;
    return a > b ? -1 : (a < b ? 1 : 0);
  }

  // Ordena a lista de visitas de forma
  // crescente.
  ordernarPorDataCrescente(a: any, b: any) {
    a = a.visita.dataVisita as Date;
    b = b.visita.dataVisita as Date;
    return a > b ? 1 : (a < b ? -1 : 0);
  }

  separarListagens(registro: any) {
    // Verificação para saber se a visita está concluída, pendente
    // ou atrasada para separar cada objeto da interação para sua
    // respectiva lista.
    if (registro.visita.status === this.listStatus.concluida.mensagem) {
      registro.visita.status = this.listStatus.concluida;
      this.visitasConcluidas.push(registro);
    } else if (registro.visita.status === this.listStatus.pendente.mensagem) {
      registro.visita.status = this.listStatus.pendente;
      this.visitasPendentes[0].visitas.push(registro);
    } else if (registro.visita.status === this.listStatus.atrasada.mensagem) {
      registro.visita.status = this.listStatus.atrasada;
      this.visitasPendentes[1].visitas.push(registro);
    }
  }

  verificarRiscoPaciente(somatorio: number) {
    // Listagem de cores de acordo com a estratificação;
    const colors = {
      semRisco: '#000ED5',
      riscoBaixo: '#059E1A',
      riscoMedio: '#C2BF00',
      riscoGrave: '#B40000'
    };
    // Valida o somatório para atribuir que cor o circulo,
    // que se refere ao risco do paciente, irá receber.
    let riscoPaciente = colors.semRisco;
    if (somatorio >= 6 && somatorio <= 10) {
      riscoPaciente = colors.riscoBaixo;
    } else if (somatorio > 10 && somatorio <= 15) {
      riscoPaciente = colors.riscoMedio;
    } else if (somatorio > 15) {
      riscoPaciente = colors.riscoGrave;
    }
    return riscoPaciente;
  }

  // Abre a janela modal que possuí o cadastro
  // e alteração de visitas.
  openModal(visita?: Visita) {
    let dialogRef: MatDialogRef<FormVisitasComponent> = null;
    if (visita) {
      dialogRef = this.dialog.open(FormVisitasComponent, {
        height: '550px',
        width: '450px',
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

    // Quando for fechada a janela modal
    // esse método é chamado e atualiza a
    // lista.
    dialogRef.afterClosed().subscribe(
      (res: Visita) => {
        if (res) {
          this.listarVisitas();
        }
      }
    );
  }

}

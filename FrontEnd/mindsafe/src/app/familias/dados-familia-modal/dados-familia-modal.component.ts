import { CausasService } from './../../services/causas/causas.service';
import { MensagemService } from "src/app/shared/mensagem/mensagem.service";
import { tap, map } from "rxjs/operators";
import { MedicamentoPessoaService } from "./../../services/medicamentoPessoa/medicamento-pessoa.service";
import { CausaPessoaService } from "./../../services/causaPessoa/causa-pessoa.service";
import { FamiliasService } from "./../../services/familias/familias.service";
import { Paciente } from "./../../models/paciente.model";
import { Familia } from "./../../models/familia.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { PacientesService } from "src/app/services/pacientes/pacientes.service";

@Component({
  selector: "app-dados-familia-modal",
  templateUrl: "./dados-familia-modal.component.html",
  styleUrls: ["./dados-familia-modal.component.scss"],
})
export class DadosFamiliaModalComponent implements OnInit {
  familia: Familia;
  responsavel: Paciente;
  listaMembros: any[] = [];
  listaTeste: Paciente[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private familiaServe: FamiliasService,
    private causaPessoaServe: CausaPessoaService,
    private pacientesServe: PacientesService,
    private medicamentoServe: MedicamentoPessoaService,
    private mensagemService: MensagemService,
    private causaServe: CausasService,
  ) {}

  ngOnInit() {
    this.familia = this.data.dados.familia;
    this.responsavel = this.data.dados.responsavel;
    this.listarMembros();
  }

  listarMembros() {
    this.pacientesServe
      .retornarMembrosFamilia(this.familia)
      .pipe(
        tap((pessoas) =>
          pessoas.forEach((paciente) => {
            this.medicamentoServe
              .retornarMedicamentos(paciente)
              .pipe(
                tap((medicamentos) => {
                  this.causaPessoaServe
                    .listarCausas(paciente)
                    .pipe(
                      map(causas => causas.map(res => res.causa)),
                      tap(causas => {
                        this.causaServe.retornarSomatorioRiscosPaciente(paciente).pipe(
                          tap(somatorio => {
                            const objeto = {
                              nome: paciente.nome,
                              totMedicamentos: medicamentos !== null ? medicamentos.length : 0,
                              totRiscos: causas !== null ? causas.length : 0,
                              somatorio
                            };
                            this.listaMembros.push(objeto);
                          })
                        ).subscribe(
                          success => success,
                          err => this.mensagemService.exibirMensagem("Erro ao carregar somatório de riscos", "error")
                        );
                      })
                    )
                    .subscribe(
                      (success) => success,
                      (err) =>
                        this.mensagemService.exibirMensagem(
                          "Erro ao carregar os riscos",
                          "error"
                        )
                    );
                })
              )
              .subscribe(
                (success) => success,
                (err) =>
                  this.mensagemService.exibirMensagem(
                    "Erro ao carregar os medicamentos",
                    "error"
                  )
              );
          })
        )
      )
      .subscribe(
        (res) => (this.listaTeste = res),
        (err) => err
      );
  }

  atribuirRisco(somatorio: number) {
    const colors = {
      semRisco: '#000ED5',
      riscoBaixo: '#059E1A',
      riscoMedio: '#C2BF00',
      riscoGrave: '#B40000'
    };

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
}

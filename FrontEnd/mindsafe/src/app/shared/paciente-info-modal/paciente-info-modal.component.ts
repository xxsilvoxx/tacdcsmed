import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MedicamentoPessoa } from '../../models/medicamentoPessoa.model';
import { MedicamentoPessoaService } from '../../services/medicamentoPessoa/medicamento-pessoa.service';
import { CausaPessoa } from '../../models/causaPessoa.model';
import { CausaPessoaService } from '../../services/causaPessoa/causa-pessoa.service';
import { MensagemService } from '../mensagem/mensagem.service';
import { Visita } from '../../models/visita.model';
import { VisitaService } from '../../services/visitas/visita.service';

@Component({
  selector: 'app-paciente-info-modal',
  templateUrl: './paciente-info-modal.component.html',
  styleUrls: ['./paciente-info-modal.component.scss']
})
export class PacienteInfoModalComponent implements OnInit {

  contatos = [];
  risco = 0;

  causas$: Observable<CausaPessoa[]>;
  medicamentos$: Observable<MedicamentoPessoa[]>;
  agendamentos$: Observable<Visita[]>;

  constructor(
    private modalRef: MatDialogRef<PacienteInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicamentoPessoaService: MedicamentoPessoaService,
    private causaPessoaService: CausaPessoaService,
    private visitaService: VisitaService,
    private msgService: MensagemService
  ) { }

  ngOnInit() {
    this.criarContatosUsuario();
    this.listarMedicamentos();
    this.listarCausas();
    this.listarAgendamentos();
  }

  listarCausas() {
    this.causas$ = this.causaPessoaService.listarCausas(this.data.paciente).pipe(
      tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Causas Vazia', 'info') : EMPTY),
      tap(l => l.forEach(v => this.risco += v.causa.risco))
    );
  }

  listarMedicamentos() {
    this.medicamentos$ = this.medicamentoPessoaService.retornarMedicamentos(this.data.paciente).pipe(
      tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Medicamentos Vazia', 'info') : EMPTY)
    );
  }

  listarAgendamentos() {
    this.agendamentos$ = this.visitaService.listarConsultas(this.data.paciente).pipe(
      tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Agendamentos Vazia', 'info') : EMPTY)
    );
  }

  criarContatosUsuario() {
    if (this.data.paciente.cpfCnpj) {
      this.contatos.push(`${this.data.paciente.cpfCnpj}`);
    }
    if (this.data.paciente.telefone) {
      this.contatos.push(`${this.data.paciente.telefone}`);
    }
    if (this.data.paciente.celular) {
      this.contatos.push(`${this.data.paciente.celular}`);
    }
    if (this.data.paciente.email) {
      this.contatos.push(`${this.data.paciente.email}`);
    }
  }

  retornarDescricaoRisco(): string {
    let texto = '';
    if (this.risco <= 5) {
      texto = 'Nenhum Risco';
    } else if (this.risco <= 10) {
      texto = 'Risco Baixo';
    } else if (this.risco <= 15) {
      texto = 'Risco Médio';
    } else {
      texto = 'Risco Grave';
    }
    return texto;
  }

  onClose() {
    this.modalRef.close();
  }

}

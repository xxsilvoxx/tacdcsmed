import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MedicamentoPessoa } from '../../models/medicamentoPessoa.model';
import { MedicamentoPessoaService } from '../../services/medicamentoPessoa/medicamento-pessoa.service';
import { Observable, EMPTY } from 'rxjs';
import { CausaPessoa } from '../../models/causaPessoa.model';
import { CausaPessoaService } from '../../services/causaPessoa/causa-pessoa.service';
import { tap, map } from 'rxjs/operators';
import { MensagemService } from '../mensagem/mensagem.service';

@Component({
  selector: 'app-paciente-info-modal',
  templateUrl: './paciente-info-modal.component.html',
  styleUrls: ['./paciente-info-modal.component.scss']
})
export class PacienteInfoModalComponent implements OnInit {

  contatos = [];

  risco = 0;

  causas: CausaPessoa[];

  medicamentos$: Observable<MedicamentoPessoa[]>;

  agendamentos: any[] = [
    {
      descricao: 'Dra. Amélia Alves - Psicóloga',
      data: new Date().getDate(),
      hora: new Date().getHours()
    },
    {
      descricao: 'Dr. Luiz Matarazzo - Psicólogo',
      data: new Date().getDate(),
      hora: new Date().getHours()
    },
    {
      descricao: 'Dra. Amélia Alves - Psicóloga',
      data: new Date().getDate(),
      hora: new Date().getHours()
    },
  ];

  constructor(
    private modalRef: MatDialogRef<PacienteInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicamentoPessoaService: MedicamentoPessoaService,
    private causaPessoaService: CausaPessoaService,
    private msgService: MensagemService
  ) { }

  ngOnInit() {
    this.criarContatosUsuario();
    this.listarMedicamentos();
    this.listarCausas();
  }

  listarCausas() {
    this.causaPessoaService.listarCausas(this.data.paciente).pipe(
      tap(l => l.forEach(v => this.risco += v.causa.risco))
    ).subscribe(
      res => {
        if (res.length == 0) {
          this.msgService.exibirMensagem('Lista de Causas Está Vazia', 'info');
        }
        this.causas = res;
      },
      error => {
        this.msgService.exibirMensagem('Não foi possível listar as causas', 'error');
      }
    );
  }

  listarMedicamentos() {
    this.medicamentos$ = this.medicamentoPessoaService.retornarMedicamentos(this.data.paciente).pipe(
      tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Medicamentos Vazia', 'info') : EMPTY)
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

  retornarSomaRiscos() {
    let sumRisco = 0;

    this.risco = sumRisco;
    return sumRisco;
  }

  onClose() {
    this.modalRef.close();
  }

}

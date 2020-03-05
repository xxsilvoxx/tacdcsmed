import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MedicamentoPessoa } from '../../models/medicamentoPessoa.model';
import { MedicamentoPessoaService } from '../../services/medicamentoPessoa/medicamento-pessoa.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paciente-info-modal',
  templateUrl: './paciente-info-modal.component.html',
  styleUrls: ['./paciente-info-modal.component.scss']
})
export class PacienteInfoModalComponent implements OnInit {

  contatos = [];

  risco = 0;

  causas: any[] = [
    { descricao: 'Conflitos Familiares', risco: 1 },
    { descricao: 'Dificuldades Socioeconômicas', risco: 1 },
    { descricao: 'Etilismo', risco: 2 }
  ];

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
    private medicamentoPessoaService: MedicamentoPessoaService
  ) { }

  ngOnInit() {
    this.criarContatosUsuario();
    this.listarMedicamentos();
  }

  listarMedicamentos() {
    this.medicamentos$ = this.medicamentoPessoaService.retornarMedicamentos(this.data.paciente);
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
    this.causas.forEach(
      c => {
        sumRisco += c.risco;
      }
    );
    this.risco = sumRisco;
    return sumRisco;
  }

  onClose() {
    this.modalRef.close();
  }

}

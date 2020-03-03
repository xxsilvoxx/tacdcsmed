import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-paciente-info-modal',
  templateUrl: './paciente-info-modal.component.html',
  styleUrls: ['./paciente-info-modal.component.scss']
})
export class PacienteInfoModalComponent implements OnInit {

  contatos = [];

  causas: any[] = [
    { descricao: 'Conflitos Familiares', risco: 6 },
    { descricao: 'Dificuldades Socioeconômicas', risco: 4 },
    { descricao: 'Etilismo', risco: 5 }
  ];

  medicamentos: any[] = [
    {
      nome: 'ARIPIPRAZOL',
      horarios: ['10hrs', '20hrs']
    },
    {
      nome: 'BRONDYNEO',
      horarios: ['8hrs', '16hrs', '0hr']
    },
    {
      nome: 'LISOMUC',
      horarios: ['10hrs', '20hrs']
    },
    {
      nome: 'CONFILIFY',
      horarios: ['10hrs']
    },
  ];

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.criarContatosUsuario();
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

  retornarSomaRiscos() {
    let sumRisco = 0;
    this.causas.forEach(
      c => {
        sumRisco += c.risco;
      }
    );
    return sumRisco;
  }

  onClose() {
    this.modalRef.close();
  }

}

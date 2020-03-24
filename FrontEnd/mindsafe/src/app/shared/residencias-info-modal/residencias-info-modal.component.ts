import { ResidenciasService } from './../../services/residencias/residencias.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemService } from '../mensagem/mensagem.service';


@Component({
  selector: 'app-residencias-info-modal',
  templateUrl: './residencias-info-modal.component.html',
  styleUrls: ['./residencias-info-modal.component.scss']
})
export class ResidenciasInfoModalComponent implements OnInit {


  familia = [];
  residencia = [];

  constructor(
    private modalRef: MatDialogRef<ResidenciasInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private residenciasService: ResidenciasService,
    private msgService: MensagemService
  ) { }

  ngOnInit() {
    this.retornaResidencias();
    this.retornaFamilia();
  }

  // retorna informações da residencia
  retornaResidencias() {
    if (this.data.residencia.idResidencia) {
      this.residencia.push(`${this.data.residencia.idResidencia}`);
    }
    if (this.data.residencia.logradouro) {
      this.residencia.push(`${this.data.residencia.logradouro}`);
    }
    if (this.data.residencia.numero) {
      this.residencia.push(`Número: ${this.data.residencia.numero}`);
    }
    if (this.data.residencia.microArea.bairro.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.cidade.nome}`);
    }
    if (this.data.residencia.microArea.bairro.cidade.estado.nome) {
      this.residencia.push(`${this.data.residencia.microArea.bairro.cidade.estado.nome}`);
    }
    if (this.data.residencia.cep) {
      this.residencia.push(`CEP: ${this.data.residencia.cep}`);
    }
    if (this.data.residencia.localReferencia) {
      this.residencia.push(`${this.data.residencia.localReferencia}`);
    }
    if (this.data.residencia.complemento) {
      this.residencia.push(`${this.data.residencia.complemento}`);
    }
  }

  retornaFamilia() {
    // Retorna nome da familia
    if (this.data.residencia.familia.nome) {
      this.familia.push(`${this.data.residencia.familia.nome}`);
    }
  }

  retornaComponentesFamilia() {
    for (let i = 0; this.data.residencia.familia.lenght > 0; i ++) {

    }
  }




  // listarCausas() {
  //   this.causas$ = this.causaPessoaService.listarCausas(this.data.residencias).pipe(
  //     tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Causas Vazia', 'info') : EMPTY),
  //     tap(l => l.forEach(v => this.risco += v.causa.risco))
  //   );
  // }

  // listarMedicamentos() {
  //   this.medicamentos$ = this.medicamentoPessoaService.retornarMedicamentos(this.data.residencias).pipe(
  //     tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Medicamentos Vazia', 'info') : EMPTY)
  //   );
  // }

  // listarAgendamentos() {
  //   this.agendamentos$ = this.visitaService.listarConsultas(this.data.residencias).pipe(
  //     tap(v => v.length == 0 ? this.msgService.exibirMensagem('Lista de Agendamentos Vazia', 'info') : EMPTY)
  //   );
  // }

  // criarContatosUsuario() {
  //   if (this.data.residencias.cpfCnpj) {
  //     this.contatos.push(`${this.data.residencias.cpfCnpj}`);
  //   }
  //   if (this.data.residencias.telefone) {
  //     this.contatos.push(`${this.data.residencias.telefone}`);
  //   }
  //   if (this.data.residencias.celular) {
  //     this.contatos.push(`${this.data.residencias.celular}`);
  //   }
  //   if (this.data.residencias.email) {
  //     this.contatos.push(`${this.data.residencias.email}`);
  //   }
  // }

  // retornarDescricaoRisco(): string {
  //   let texto = '';
  //   if (this.risco <= 5) {
  //     texto = 'Nenhum Risco';
  //   } else if (this.risco <= 10) {
  //     texto = 'Risco Baixo';
  //   } else if (this.risco <= 15) {
  //     texto = 'Risco Médio';
  //   } else {
  //     texto = 'Risco Grave';
  //   }
  //   return texto;
  // }

  onClose() {
    this.modalRef.close();
  }

}

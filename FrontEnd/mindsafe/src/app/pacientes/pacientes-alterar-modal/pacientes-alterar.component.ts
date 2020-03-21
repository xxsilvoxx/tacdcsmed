import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../models/paciente.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { Pais, PaisesService } from '../../services/paises/paises.service';
import { tap } from 'rxjs/operators';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';

@Component({
  selector: 'app-pacientes-alterar',
  templateUrl: './pacientes-alterar.component.html',
  styleUrls: ['./pacientes-alterar.component.scss']
})
export class PacientesAlterarComponent implements OnInit {

  pacientes: Paciente[];
  formAlteracaoPacientes: FormGroup;

  paises$: Observable<Pais[]>;

  constructor(
    private modalRef: MatDialogRef<PacientesAlterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private paisesService: PaisesService,
    private msg: MensagemService,
    private pacientesService: PacientesService,
  ) { }

  ngOnInit() {
    this.pacientes = this.data.pacientes;
    this.criarFormulario();
    this.listarPaises();
  }

  onConfirm() {
    const nacionalidade = this.formAlteracaoPacientes.get('nacionalidade').value;
    const sexo = this.formAlteracaoPacientes.get('sexo').value;
    for (const paciente of this.pacientes) {
      let count = 1;
      if (nacionalidade !== '') {
        paciente.nacionalidade = nacionalidade;
      }
      if (sexo !== '') {
        paciente.sexo = sexo;
      }
      this.pacientesService.alterar(paciente, paciente.idPessoa).subscribe(
        success => success,
        err => this.msg.exibirMensagem(`Erro ao alterar o ${count}° paciente`, 'error')
      );
      count++;
    }
    this.modalRef.close(this.pacientes);
  }

  onDecline() {
    this.modalRef.close();
  }

  criarFormulario() {
    this.formAlteracaoPacientes = this.builder.group({
      nacionalidade: [''],
      sexo: ['']
    });
  }

  listarPaises() {
    this.paises$ = this.paisesService.listarPaises().pipe(
      tap(v => v.length === 0 ? this.msg.exibirMensagem('A lista de paises está vazia', 'info') : EMPTY)
    );
  }
}

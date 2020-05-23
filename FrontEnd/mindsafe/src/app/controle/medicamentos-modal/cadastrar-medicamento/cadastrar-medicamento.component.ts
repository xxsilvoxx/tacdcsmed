import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/medicamento.model';
import { medicamentoDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';

@Component({
  selector: 'app-cadastrar-medicamento',
  templateUrl: './cadastrar-medicamento.component.html',
  styleUrls: ['./cadastrar-medicamento.component.scss']
})
export class CadastrarMedicamentoComponent implements OnInit {

  controlNome: FormControl = new FormControl(null, {
    validators: [
      Validators.maxLength(250),
      Validators.required
    ],
    asyncValidators: [ medicamentoDisponivelValidator(this.service) ]
  });

  constructor(
    private dialogRef: MatDialogRef<CadastrarMedicamentoComponent>,
    private valdiation: MensagemValidationService,
    private msg: MensagemService,
    private service: MedicamentosService
  ) { }

  ngOnInit() {}

  retornarValidacoes() {
    return this.valdiation.getErrorMessage(this.controlNome, 'Nome');
  }

  cadastrar() {
    const medicamento = new Medicamento();
    medicamento.nome = this.controlNome.value;
    this.service.cadastrarMedicamento(medicamento).subscribe(
      res => {
        this.msg.exibirMensagem('Medicamento cadastrado com sucesso', 'done');
        this.dialogRef.close();
      },
      err => this.msg.exibirMensagem('Erro ao cadastrar o medicamento', 'error')
    );
  }

}

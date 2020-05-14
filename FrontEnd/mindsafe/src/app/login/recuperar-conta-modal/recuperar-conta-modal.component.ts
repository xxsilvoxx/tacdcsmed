import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';

import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { RecuperarSenhaService } from '../../services/recuperar-senha/recuperar-senha.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { ProgressBarService } from '../../shared/progress-bar/progress-bar.service';
import { Funcionario } from '../../models/funcionario.model';
import { validarSenhasDiferentes, validarSenhaDiferenteOriginal } from '../../shared/mensagem-validation/form-validations';

@Component({
  selector: 'app-recuperar-conta-modal',
  templateUrl: './recuperar-conta-modal.component.html',
  styleUrls: ['./recuperar-conta-modal.component.scss']
})
export class RecuperarContaModalComponent implements OnInit {

  funcionario: Funcionario;

  // Variável que armazena o resultado
  // da requisição para validar o token
  tokenValidado = false;

  emailControl: FormControl;
  tokenControl: FormControl;
  formSenha: FormGroup;

  exibirSenha = false;

  constructor(
    private dialogRef: MatDialogRef<RecuperarContaModalComponent>,
    private builder: FormBuilder,
    private validation: MensagemValidationService,
    private msg: MensagemService,
    private service: RecuperarSenhaService,
    public progressService: ProgressBarService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.formSenha.get('confirmarSenha').
    setValidators(
      [
        validarSenhasDiferentes('novaSenha'),
        Validators.required,
        Validators.maxLength(10)
      ]
    );
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formSenha = this.builder.group({
      novaSenha: [null, [Validators.required, Validators.maxLength(10)]],
      confirmarSenha: [null]
    });

    this.emailControl = this.builder.control(null, [Validators.required, Validators.email]);

    this.tokenControl = this.builder.control(null, Validators.required);
  }

  mudarExibirSenha() {
    this.exibirSenha = ! this.exibirSenha;
  }

  /**
   * Método aguarda o retorno do servidor caso
   * a operação de e-mail tenha sucesso ou não.
   */
  buscarEmail() {
    this.service.enviarEmail(this.emailControl.value).pipe(
      tap(res => res ? this.funcionario = res : EMPTY),
      tap(res => this.formSenha.get('novaSenha').setValidators([
        Validators.required,
        Validators.maxLength(10),
        validarSenhaDiferenteOriginal(res.senha)
      ]))
    ).subscribe(
      success => this.msg.exibirMensagem('Token enviado para o seu email', 'done'),
      err => this.msg.exibirMensagem('Não foi possível validar o e-mail', 'error')
    );
  }

  /**
   * Método que valida o token passado pelo usuário,
   * envia o token para o servidor e aguardo um
   * retorno true pra poder dar prosseguimento
   * para redefinição de senha
   */
  validarToken() {
    this.service.validarToken(this.tokenControl.value, this.funcionario).subscribe(
      res => {
        this.msg.exibirMensagem('Token validado com sucesso', 'done');
        this.tokenValidado = res;
      },
      err => this.msg.exibirMensagem('Erro ao validar o token', 'error')
      .afterDismissed().subscribe(
        res => this.msg.exibirMensagem('Tente novamente !!', 'info')
      )
    );
  }

  /**
   * Método que envia a requisição com a
   * nova senha selecionada pelo usuário.
   */
  alterarSenhaFuncionario() {
    this.service.salvarNovaSenha(this.formSenha.get('novaSenha').value, this.funcionario).subscribe(
      res => {
        this.msg.exibirMensagem('Senha redefinida com sucesso', 'done');
        this.dialogRef.close(res);
      },
      err => this.msg.exibirMensagem('Erro ao redefinir a senha', 'error')
    );
  }

}

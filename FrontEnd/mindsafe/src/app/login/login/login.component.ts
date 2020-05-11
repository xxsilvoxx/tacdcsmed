import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecuperarContaModalComponent } from '../recuperar-conta-modal/recuperar-conta-modal.component';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  senhaViziveu = false;
  formLogar: FormGroup;

  constructor(
    private route: Router,
    private builder: FormBuilder,
    private dialog: MatDialog,
    private validation: MensagemValidationService,
    private msg: MensagemService,
    private service: FuncionariosService
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormulario() {
    this.formLogar = this.builder.group({
      login: [null, Validators.required],
      senha: [null, {
        validators: [ Validators.required, Validators.maxLength(10) ]
      }]
    });
  }

  abrirJanelaRecuperarConta() {
    this.dialog.open(RecuperarContaModalComponent, {
      width: '600px',
      height: '550px'
    });
  }

  vizualizarSenha() {
    this.senhaViziveu = !this.senhaViziveu;
  }

  logar() {
    this.service.logar(this.formLogar.value).pipe(
      tap(funcionario => {

        // Salva no storage da sessão o objeto json com as informações
        // do usuário para que possa executar suas operações.
        window.sessionStorage.setItem('login-mindsafe', JSON.stringify(funcionario));
      })
    ).subscribe(
      success => this.route.navigate(['mindsafe']),
      err => this.msg.exibirMensagem('Erro ao efetuar o login', 'error')
    );
  }

}

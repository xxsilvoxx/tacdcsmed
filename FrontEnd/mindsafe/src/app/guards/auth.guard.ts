import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Funcionario } from '../models/funcionario.model';
import { FuncionariosService } from '../services/funcionarios/funcionarios.service';
import { MensagemService } from '../shared/mensagem/mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private service: FuncionariosService,
    private route: Router,
    private msg: MensagemService
  ) {}

  // Canto o canLoad quanto o canActivate retornam a resposta
  // do método que verifica se o usuário fez login.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarUsuarioLogado();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarUsuarioLogado();
  }

  /**
   * Guarda de rota que simula uma situação de
   * usuário autenticado, caso as informações
   * do usuário estejam salvas no storage da
   * sessão, permite navegar entre as páginas.
   */
  verificarUsuarioLogado() {
    const logado: Funcionario = JSON.parse(window.sessionStorage.getItem('login-mindsafe'));
    if (logado !== null) {
      return true;
    }
    this.msg.exibirMensagem('Você deve efetuar o seu login', 'info', 4000);
    this.route.navigate(['/login']);
    return false;
  }

}

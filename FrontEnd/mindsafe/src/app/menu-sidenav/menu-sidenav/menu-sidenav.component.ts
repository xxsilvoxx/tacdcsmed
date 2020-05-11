import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { ImagensService } from '../../services/imagens/imagens.service';
import { ModalFuncionarioComponent } from '../modal-funcionario/modal-funcionario.component';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit, OnDestroy {

  funcionario: Funcionario = new Funcionario();

  mostrarMenu = false;
  imgUsuario = '../../../assets/imagens/user.png';

  displayFixedTopGap = 64;
  subscriptions: Subscription[] = [];

  constructor(
    private route: Router,
    private service: FuncionariosService,
    private img: ImagensService,
    private msg: MensagemService,
    private dialog: MatDialog,
    private media: MediaObserver
  ) { }

  ngOnInit() {
    this.buscarInformacoes();
    this.alterarDisplayXs();
    this.alterarDisplaySm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(v => v.unsubscribe());
  }

  buscarInformacoes() {

    // Agora o código busca do storage da sessão se o usuário está
    // salvo, permitindo navegar entre as páginas.
    this.funcionario = JSON.parse(window.sessionStorage.getItem('login-mindsafe'));
    if (this.funcionario !== null) {
      if (this.funcionario.imagem !== null) {
        this.imgUsuario = this.img.buscarImg(this.funcionario);
      }
    } else {
      this.msg.exibirMensagem('Erro ao carregar suas informacoes', 'error');
    }
  }

  alterarDisplayXs() {
    const subsXs = this.media.asObservable().pipe(
      filter(() => this.media.isActive('xs'))
    ).subscribe(
      res => {
        this.displayFixedTopGap = 56;
      }
    );

    this.subscriptions.push(subsXs);
  }

  alterarDisplaySm() {
    const subsSm = this.media.asObservable().pipe(
      filter(() => this.media.isActive('sm'))
    ).subscribe(
      res => {
        this.displayFixedTopGap = 64;
      }
    );

    this.subscriptions.push(subsSm);
  }

  openModalInfo() {
    const dialogRef = this.dialog.open(ModalFuncionarioComponent, {
      data: {
        funcionario: this.funcionario
      },
      height: '540px',
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(
      res => {
        this.buscarInformacoes();
        this.imgUsuario = '../../../assets/imagens/user.png';
      }
    );
  }

  sair() {
    window.sessionStorage.removeItem('login-mindsafe');
    this.route.navigate(['login']);
  }

}

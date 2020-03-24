import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Funcionario } from '../../models/funcionario.model';
import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { ImagensService } from '../../services/imagens/imagens.service';
import { ModalFuncionarioComponent } from '../modal-funcionario/modal-funcionario.component';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();

  mostrarMenu = false;
  imgUsuario = '../../../assets/imagens/avatar-usuario/user.png';

  constructor(
    private route: Router,
    private service: FuncionariosService,
    private img: ImagensService,
    private msg: MensagemService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.buscarInformacoes();
  }

  buscarInformacoes() {
    this.service.listarUsuario().subscribe(
      res => {
        this.funcionario = res;
        if (this.funcionario.imagem !== null) {
          this.imgUsuario = this.img.buscarImg(this.funcionario);
        }
      },
      err => this.msg.exibirMensagem('Erro ao carregar suas informacoes', 'error')
    );
  }

  openModalInfo() {
    const dialogRef = this.dialog.open(ModalFuncionarioComponent, {
      data: {
        funcionario: this.funcionario
      },
      height: '540px',
      width: '650px'
    });
  }

  sair() {
    this.route.navigate(['login']);
  }

}

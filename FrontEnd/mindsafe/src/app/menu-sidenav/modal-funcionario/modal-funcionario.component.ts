import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { Funcionario } from '../../models/funcionario.model';
import { ImagensService } from '../../services/imagens/imagens.service';

@Component({
  selector: 'app-modal-funcionario',
  templateUrl: './modal-funcionario.component.html',
  styleUrls: ['./modal-funcionario.component.scss']
})
export class ModalFuncionarioComponent implements OnInit {

  funcionario: Funcionario;
  imgUsuario = '../../../assets/imagens/avatar-usuario/user.png';

  constructor(
    private modalRef: MatDialogRef<ModalFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: FuncionariosService,
    private img: ImagensService
  ) { }

  ngOnInit() {
    this.funcionario = this.data.funcionario;
    this.carregarImg(this.funcionario);
  }

  carregarImg(funcionario: Funcionario) {
    funcionario.imagem = null;
    if (funcionario.imagem !== null) {
      this.imgUsuario = this.img.buscarImg(funcionario);
    }
  }

}

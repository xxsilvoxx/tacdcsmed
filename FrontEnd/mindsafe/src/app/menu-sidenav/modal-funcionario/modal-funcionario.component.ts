import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, EMPTY } from 'rxjs';

import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { Funcionario } from '../../models/funcionario.model';
import { ImagensService } from '../../services/imagens/imagens.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-funcionario',
  templateUrl: './modal-funcionario.component.html',
  styleUrls: ['./modal-funcionario.component.scss']
})
export class ModalFuncionarioComponent implements OnInit, OnDestroy {

  funcionario: Funcionario;
  imgUsuario = '../../../assets/imagens/avatar-usuario/user.png';

  // variável que armazena a imagem selecionada para fazer upload
  imgUpload: File = null;

  constructor(
    private modalRef: MatDialogRef<ModalFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: FuncionariosService,
    private img: ImagensService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.funcionario = this.data.funcionario;
    this.carregarImg(this.funcionario);
  }

  ngOnDestroy() {
    this.modalRef.close(this.funcionario);
  }

  onClose() {
    this.modalRef.close(this.funcionario);
  }

  carregarImg(funcionario: Funcionario) {
    if (funcionario.imagem !== null) {
      this.imgUsuario = this.img.buscarImg(funcionario);
    }
  }

  onSelectFile(event) {
    const file = <FileList> event.srcElement.files;
    this.imgUpload = file[0];
  }

  onUpload() {
    if (this.imgUpload && this.imgUpload.size > 0 && this.imgUpload.size <= 1048576) {
      this.img.adicionarImg(this.imgUpload, this.funcionario).pipe(
        tap(v => v !== null
          ? this.imgUsuario = '../../../assets/imagens/avatar-usuario/user.png'
          : EMPTY),
        switchMap(v => v !== null ? this.service.listarUsuario() : EMPTY)
      ).subscribe(
        res => {
          this.funcionario = res;
          if (this.funcionario.imagem !== null) {
            this.imgUsuario = this.img.buscarImg(this.funcionario);
            this.imgUpload = null;
          }
        },
        err => this.msg.exibirMensagem('Erro ao fazer upload', 'error')
      );
    }
  }

  // Validar o tamanho do arquivo, pra não exceder 1048576 bytes

  onRemoveImg() {
    this.img.removerImg(this.funcionario).pipe(
      tap(v => v === null
        ? this.imgUsuario = '../../../assets/imagens/avatar-usuario/user.png'
        : EMPTY
      )
    ).subscribe(
      success => {
        this.msg.exibirMensagem('Imagem removida com sucesso', 'done');
        this.funcionario.imagem = null;
      },
      err => this.msg.exibirMensagem('Erro ao remover a imagem', 'error')
    );
  }



}

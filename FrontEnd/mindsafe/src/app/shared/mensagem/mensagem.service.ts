import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensagemComponent } from './mensagem/mensagem.component';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private snack: MatSnackBar
  ) { }

  exibirMensagem(mensagem: string, icon: string, tempo = 3000) {
    return this.snack.openFromComponent(MensagemComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: tempo,
      data: {
        mensagem: mensagem,
        icon: icon
      }
    });
  }

}

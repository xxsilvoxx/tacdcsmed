import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensagem',
  template: `
  <div style="position: flex; flex-direction: row;">
    <mat-icon class="material-icons">{{ data?.icon }}</mat-icon>
    <span style="margin-left: 20px; font-size: 20px;">{{ data?.mensagem }}</span>
  </div>
  `,
})
export class MensagemComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}

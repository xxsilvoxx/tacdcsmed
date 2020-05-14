import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PacienteInfoModalComponent } from './paciente-info-modal/paciente-info-modal.component';
import { MensagemComponent } from './mensagem/mensagem/mensagem.component';
import { ResidenciasInfoModalComponent } from 'src/app/shared/residencias-info-modal/residencias-info-modal.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    PacienteInfoModalComponent,
    ResidenciasInfoModalComponent,
    MensagemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    PacienteInfoModalComponent,
    ResidenciasInfoModalComponent,
    MensagemComponent
  ],
  exports: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }

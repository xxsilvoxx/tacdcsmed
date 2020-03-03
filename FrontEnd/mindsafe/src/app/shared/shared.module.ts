import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PacienteInfoModalComponent } from './paciente-info-modal/paciente-info-modal.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    PacienteInfoModalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  entryComponents: [
    ConfirmModalComponent,
    PacienteInfoModalComponent
  ],
  exports: [
    ConfirmModalComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RecuperarContaModalComponent } from './recuperar-conta-modal/recuperar-conta-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarContaModalComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressBarModule,
    SharedModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    FlexLayoutModule,
    LoginRoutingModule
  ],
  entryComponents: [
    RecuperarContaModalComponent
  ]
})
export class LoginModule { }

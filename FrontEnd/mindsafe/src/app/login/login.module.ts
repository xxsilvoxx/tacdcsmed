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

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RecuperarContaModalComponent } from './recuperar-conta-modal/recuperar-conta-modal.component';


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

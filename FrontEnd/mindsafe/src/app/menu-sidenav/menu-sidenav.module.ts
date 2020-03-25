import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MenuSidenavComponent } from '../menu-sidenav/menu-sidenav/menu-sidenav.component';
import { MenuSidenavRountigModule } from './menu-sidenav-rountig.module';
import { VisitasModule } from '../visitas/visitas.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { ModalFuncionarioComponent } from '../menu-sidenav/modal-funcionario/modal-funcionario.component';

@NgModule({
  declarations: [
    MenuSidenavComponent,
    ModalFuncionarioComponent
  ],
  imports: [
    CommonModule,
    MenuSidenavRountigModule,
    VisitasModule,
    PacientesModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  entryComponents: [
    MenuSidenavComponent,
    ModalFuncionarioComponent
  ]
})
export class MenuSidenavModule { }

import { ModalFuncionarioComponent } from './modal-funcionario/modal-funcionario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MenuSidenavComponent } from '../menu-sidenav/menu-sidenav/menu-sidenav.component';
import { MenuSidenavRountigModule } from './menu-sidenav-rountig.module';
import { VisitasModule } from '../visitas/visitas.module';
import { PacientesModule } from '../pacientes/pacientes.module';
import { ResidenciasModule } from '../residencias/residencias.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuSidenavComponent,
    ModalFuncionarioComponent
  ],
  imports: [
    CommonModule,
    MenuSidenavRountigModule,
    FormsModule,
    ReactiveFormsModule,
    ResidenciasModule,
    VisitasModule,
    PacientesModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    SharedModule,
    FlexLayoutModule
  ],
  entryComponents: [
    MenuSidenavComponent,
    ModalFuncionarioComponent
  ]
})
export class MenuSidenavModule { }

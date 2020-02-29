import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuSidenavComponent } from './menu-sidenav.component';
import { MenuSidenavRountigModule } from './menu-sidenav-rountig.module';
import { VisitasModule } from '../visitas/visitas.module';
import { PacientesModule } from '../pacientes/pacientes.module';

@NgModule({
  declarations: [
    MenuSidenavComponent
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
    FlexLayoutModule
  ],
  entryComponents: [
    MenuSidenavComponent
  ]
})
export class MenuSidenavModule { }

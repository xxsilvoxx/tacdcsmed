import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { VisitasRoutingModule } from './visitas-routing.module';
import { VisitasComponent } from './visitas.component';


@NgModule({
  declarations: [
    VisitasComponent
  ],
  imports: [
    CommonModule,
    VisitasRoutingModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    VisitasRoutingModule
  ]
})
export class VisitasModule { }

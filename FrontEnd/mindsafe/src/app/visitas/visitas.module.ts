import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { VisitasRoutingModule } from './visitas-routing.module';
import { VisitasComponent } from './visitas/visitas.component';


@NgModule({
  declarations: [
    VisitasComponent
  ],
  imports: [
    CommonModule,
    VisitasRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    VisitasRoutingModule
  ]
})
export class VisitasModule { }

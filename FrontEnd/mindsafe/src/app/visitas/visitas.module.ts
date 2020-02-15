import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { VisitasRoutingModule } from './visitas-routing.module';
<<<<<<< HEAD
import { VisitasComponent } from './visitas/visitas.component';
=======
import { VisitasComponent } from './visitas.component';
import {MatListModule} from '@angular/material/list';
>>>>>>> efed9684837c3cbf8094f6d8277d6026dc8bd742


@NgModule({
  declarations: [
    VisitasComponent
  ],
  imports: [
    CommonModule,
    VisitasRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
    
  ],
  exports: [
    VisitasRoutingModule
  ]
})
export class VisitasModule { }

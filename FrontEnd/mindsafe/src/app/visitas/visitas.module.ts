import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { VisitasRoutingModule } from './visitas-routing.module';
import { VisitasComponent } from './visitas.component';
<<<<<<< HEAD
=======
import {MatListModule} from '@angular/material/list';

>>>>>>> 547a5288182441c4a8a51f94e4135ce0aef01c2c

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

import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { VisitasRoutingModule } from './visitas-routing.module';
import { VisitasComponent } from './visitas/visitas.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormVisitasComponent } from './form-visitas/form-visitas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    VisitasComponent,
    FormVisitasComponent
  ],
  imports: [
    CommonModule,
    VisitasRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule

  ],
  entryComponents: [
    FormVisitasComponent


  ]
})
export class VisitasModule { }

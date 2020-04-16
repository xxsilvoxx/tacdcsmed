import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { TextMaskModule } from 'angular2-text-mask';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './../shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { FamiliasFormComponent } from './familias-form-modal/familias-form-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliasRoutingModule } from './familias-routing.module';
import { FamiliasComponent } from './familias/familias.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatOption, MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    FamiliasComponent,
    FamiliasFormComponent

  ],
  imports: [
    CommonModule,
    FamiliasRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FlexLayoutModule,
    SharedModule,
    MatDialogModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatExpansionModule,
    TextMaskModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FamiliasModule { }

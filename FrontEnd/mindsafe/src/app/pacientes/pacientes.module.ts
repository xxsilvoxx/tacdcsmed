import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule}  from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { TextMaskModule } from 'angular2-text-mask';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes/pacientes.component';
import { SharedModule } from '../shared/shared.module';
import { PacientesFormComponent } from './pacientes-form-modal/pacientes-form.component';
import { PacientesAlterarComponent } from './pacientes-alterar-modal/pacientes-alterar.component';

@NgModule({
  declarations: [
    PacientesComponent,
    PacientesFormComponent,
    PacientesAlterarComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
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
  ],
  entryComponents: [
    PacientesFormComponent,
    PacientesAlterarComponent
  ]
})
export class PacientesModule { }

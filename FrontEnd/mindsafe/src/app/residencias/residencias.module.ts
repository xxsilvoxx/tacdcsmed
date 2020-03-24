import { ResidenciasInfoModalComponent } from 'src/app/shared/residencias-info-modal/residencias-info-modal.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { ResidenciasRoutingModule } from './residencias-routing.module';
import { ResidenciasComponent } from './residencias/residencias.component';
import { SharedModule } from '../shared/shared.module';
import { ResidenciasFormComponent } from './residencias-form-modal/residencias-form.component';
import { ResidenciasAlterarComponent } from './residencias-alterar-modal/residencias-alterar.component';

@NgModule({
  declarations: [
    ResidenciasComponent,
    ResidenciasFormComponent,
    ResidenciasAlterarComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    ResidenciasRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FlexLayoutModule,
    SharedModule
  ],
  entryComponents: [
    ResidenciasFormComponent
  ]
})
export class ResidenciasModule { }

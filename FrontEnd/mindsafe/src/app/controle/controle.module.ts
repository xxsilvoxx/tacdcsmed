import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle/controle.component';
import { CadastrarMedicamentoComponent } from './medicamentos-modal/cadastrar-medicamento/cadastrar-medicamento.component';
import { VizualizarMedicamentosComponent } from './medicamentos-modal/vizualizar-medicamentos/vizualizar-medicamentos.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ControleComponent,
    CadastrarMedicamentoComponent,
    VizualizarMedicamentosComponent
  ],
  imports: [
    CommonModule,
    ControleRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CadastrarMedicamentoComponent,
    VizualizarMedicamentosComponent
  ]
})
export class ControleModule { }

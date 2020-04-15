import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle/controle.component';
import { CadastrarMedicamentoComponent } from './medicamentos-modal/cadastrar-medicamento/cadastrar-medicamento.component';
import { VizualizarMedicamentosComponent } from './medicamentos-modal/vizualizar-medicamentos/vizualizar-medicamentos.component';
import { CadastrarMicroareaComponent } from './microareas-modal/cadastrar-microarea/cadastrar-microarea.component';
import { VizualizarMicroareasComponent } from './microareas-modal/vizualizar-microareas/vizualizar-microareas.component';
import { CadastrarRiscoComponent } from './riscos-modal/cadastrar-risco/cadastrar-risco.component';
import { VizualizarRiscosComponent } from './riscos-modal/vizualizar-riscos/vizualizar-riscos.component';
import { CadastrarFuncaoComponent } from './funcoes-modal/cadastrar-funcao/cadastrar-funcao.component';
import { VizualizarFuncoesComponent } from './funcoes-modal/vizualizar-funcoes/vizualizar-funcoes.component';
import { CadastrarUbsComponent } from './ubs-modal/cadastrar-ubs/cadastrar-ubs.component';
import { VizualizarUbsComponent } from './ubs-modal/vizualizar-ubs/vizualizar-ubs.component';
import { CadastrarFuncionarioComponent } from './funcionarios-modal/cadastrar-funcionario/cadastrar-funcionario.component';
import { VizualizarFuncionariosComponent } from './funcionarios-modal/vizualizar-funcionarios/vizualizar-funcionarios.component';

@NgModule({
  declarations: [
    ControleComponent,
    CadastrarMedicamentoComponent,
    VizualizarMedicamentosComponent,
    CadastrarMicroareaComponent,
    VizualizarMicroareasComponent,
    CadastrarRiscoComponent,
    VizualizarRiscosComponent,
    CadastrarFuncaoComponent,
    VizualizarFuncoesComponent,
    CadastrarUbsComponent,
    VizualizarUbsComponent,
    CadastrarFuncionarioComponent,
    VizualizarFuncionariosComponent
  ],
  imports: [
    CommonModule,
    ControleRoutingModule,
    FlexLayoutModule,
    TextMaskModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CadastrarMedicamentoComponent,
    VizualizarMedicamentosComponent,
    CadastrarMicroareaComponent,
    VizualizarMicroareasComponent,
    CadastrarRiscoComponent,
    VizualizarRiscosComponent,
    CadastrarFuncaoComponent,
    VizualizarFuncoesComponent,
    CadastrarUbsComponent,
    VizualizarUbsComponent,
    CadastrarFuncionarioComponent,
    VizualizarFuncionariosComponent
  ]
})
export class ControleModule { }

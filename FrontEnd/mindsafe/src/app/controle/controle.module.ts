import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { ControleRoutingModule } from './controle-routing.module';
import { ControleComponent } from './controle/controle.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ControleComponent
  ],
  imports: [
    CommonModule,
    ControleRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ControleModule { }

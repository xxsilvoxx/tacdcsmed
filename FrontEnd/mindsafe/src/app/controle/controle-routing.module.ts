import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleComponent } from './controle/controle.component';


const routes: Routes = [
  { path: '', component: ControleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleRoutingModule { }

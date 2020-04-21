import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidenciasComponent } from './residencias/residencias.component';


const routes: Routes = [
  { path: '', component: ResidenciasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciasRoutingModule { }

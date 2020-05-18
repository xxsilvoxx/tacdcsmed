import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'visitas', loadChildren: () => import('../visitas/visitas.module').then(m => m.VisitasModule)},
  { path: 'pacientes', loadChildren: () => import('../pacientes/pacientes.module').then(m => m.PacientesModule) },
  { path: 'familias', loadChildren: () => import('../familias/familias.module').then(m => m.FamiliasModule) },
  { path: 'residencias', loadChildren: () => import ('../residencias/residencias.module').then(m => m.ResidenciasModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

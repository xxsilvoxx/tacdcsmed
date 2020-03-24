import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuSidenavComponent } from '../menu-sidenav/menu-sidenav/menu-sidenav.component';

const routes: Routes = [
  {
    path: '', component: MenuSidenavComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'residencias', loadChildren: () => import ('../residencias/residencias.module').then(m => m.ResidenciasModule)},
      { path: 'visitas', loadChildren: () => import('../visitas/visitas.module').then(m => m.VisitasModule)},
      { path: 'pacientes', loadChildren: () => import('../pacientes/pacientes.module').then(m => m.PacientesModule) },
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuSidenavRountigModule { }

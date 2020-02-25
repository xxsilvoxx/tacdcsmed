import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: 'src/app/login/login.module#LoginModule' },
  { path: 'visitas', loadChildren: 'src/app/visitas/visitas.module#VisitasModule' },
  { path: 'pacientes', loadChildren: 'src/app/pacientes/pacientes.module#PacientesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

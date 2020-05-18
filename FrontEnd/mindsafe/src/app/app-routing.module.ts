import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/usuario-autenticado/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'mindsafe',
    loadChildren: () => import('./menu-sidenav/menu-sidenav.module').then(m => m.MenuSidenavModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: '404',
    loadChildren: () => import('./pagina-nao-encontrada/pagina-nao-encontrada.module').then(m => m.PaginaNaoEncontradaModule),
    canLoad: [ AuthGuard ]
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

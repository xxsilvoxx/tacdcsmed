import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MenuSidenavComponent } from './menu-sidenav.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    MenuSidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    MenuSidenavComponent
  ]
})
export class MenuSidenavModule { }

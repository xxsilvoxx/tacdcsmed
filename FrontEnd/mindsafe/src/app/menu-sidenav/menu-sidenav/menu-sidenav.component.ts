import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  mostrarMenu = false;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  sair() {
    this.route.navigate(['login']);
  }

}

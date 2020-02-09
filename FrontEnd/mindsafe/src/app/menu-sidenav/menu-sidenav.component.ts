import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  mostrarMenu = false;

  constructor() { }

  ngOnInit() {
  }

  isMenu() {
    this.mostrarMenu = ! this.mostrarMenu;
    let msg = this.mostrarMenu;
    console.log(msg);
  }

}

/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.scss']
})
export class FormVisitasComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormVisitasComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  msg = '17 visitas a serem feitas'

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Visitas } from '../models/visitas.model';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  msg = '17 visitas a serem feitas'

  visitas: Visitas [

    { codigo: 1, paciente: {nome: 'João'}, dataVisita: new Date(), status: true };
    
  ];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Visita } from '../../models/visita.model';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  msg = '17 visitas a serem feitas';

  visitas = [
    { codigo: 1, pessoa: { nome: 'João da Silva' }, dataVisita: new Date() },
    { codigo: 2, pessoa: { nome: 'Fernando da Silva' }, dataVisita: new Date() },
    { codigo: 1, pessoa: { nome: 'João da Silva' }, dataVisita: new Date() },
    { codigo: 2, pessoa: { nome: 'Fernando da Silva' }, dataVisita: new Date() },
    { codigo: 1, pessoa: { nome: 'João da Silva' }, dataVisita: new Date() },
    { codigo: 2, pessoa: { nome: 'Fernando da Silva' }, dataVisita: new Date() }
  ];

  constructor() { }

  ngOnInit() {
  }

}

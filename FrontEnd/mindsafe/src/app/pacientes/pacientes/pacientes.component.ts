import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  pacientes: any[] = [
    { codigo: 1, nome: 'Silvonei', familia: 'Langenberg', cpfCnpj: '5312312421' },
    { codigo: 2, nome: 'Alex', familia: 'Carpenedo', cpfCnpj: '3123123123' },
    { codigo: 3, nome: 'Fernando', familia: 'Martins', cpfCnpj: '4124124424' },
    { codigo: 4, nome: 'Leonardo', familia: 'Candido', cpfCnpj: '3123123124' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

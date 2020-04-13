import { Component, OnInit } from '@angular/core';

import { Ubs } from '../../../models/ubs.model';
import { UbsService } from '../../../services/ubs/ubs.service';

@Component({
  selector: 'app-vizualizar-ubs',
  templateUrl: './vizualizar-ubs.component.html',
  styleUrls: ['./vizualizar-ubs.component.scss']
})
export class VizualizarUbsComponent implements OnInit {

  ubs: Ubs[];

  constructor(
    private service: UbsService
  ) { }

  ngOnInit() {
    this.listarUbs();
  }

  listarUbs() {
    this.service.listar().subscribe(
      res => this.ubs = res,
      err => err
    );
  }

}

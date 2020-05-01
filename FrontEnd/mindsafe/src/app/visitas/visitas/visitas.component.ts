import { FormVisitasComponent } from './../form-visitas/form-visitas.component';
import { MatDialog } from '@angular/material/dialog';
import { Visita } from './../../models/visita.model';
import { VisitaService } from './../../services/visitas/visita.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  msg = '17 visitas a serem feitas';

  visitas$: Observable<Visita[]>;
  visitas: Visita[];

  constructor(
    private visitaService: VisitaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listarVisitas();

  }

  listarVisitas() {
    this.visitas$ = this.visitaService.listarVisitas();
  }

  openModal(visita: Visita) {
    const dialogRef = this.dialog.open(FormVisitasComponent, {
      height: '500px',
      width: '400px',
      data: {
        dados: visita
      }
    });
  }

}

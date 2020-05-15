import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/funcionario.model';
import { VisitaService } from '../../services/visitas/visita.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { Observable } from 'rxjs';
import { Paciente } from '../../models/paciente.model';
import { MicroArea } from '../../models/microArea.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  funcionario: Funcionario;

  informacoesMicroarea = {
    microArea: null as MicroArea,
    totPacientes: null as Observable<string>
  };

  constructor(
    private visitasService: VisitaService,
    private pacientesService: PacientesService
  ) {
    this.funcionario = JSON.parse(window.sessionStorage.getItem('login-mindsafe'));
  }

  ngOnInit() {
    this.exibirInformacoesMicroarea();
  }

  exibirInformacoesMicroarea() {
    this.informacoesMicroarea.microArea = this.funcionario.microArea;
    this.informacoesMicroarea.totPacientes = this.pacientesService
      .retornarPacientesNaoVisitados().pipe(
        map(pacientes => pacientes.length),
        map(
          total => total === 0
          ? 'Todos os pacientes já foram visitados'
          : (total === 1
              ? 'Somente 1 paciente à ser vistado'
              : `${total} à serem visitados`
            )
        )
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { PacienteInfoModalComponent } from '../../shared/paciente-info-modal/paciente-info-modal.component';
import { Paciente } from '../../models/paciente.model';
import { MicroArea } from '../../models/microArea.model';
import { Funcionario } from '../../models/funcionario.model';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { ResidenciasService } from '../../services/residencias/residencias.service';

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

  pacienteInfo: any[] = [];

  constructor(
    private pacientesService: PacientesService,
    private residenciasService: ResidenciasService,
    private dialog: MatDialog
  ) {
    this.funcionario = JSON.parse(window.sessionStorage.getItem('login-mindsafe'));
  }

  ngOnInit() {
    this.exibirInformacoesMicroarea();
    this.listarPacientes();
  }

  /**
   * Exibe as informações da microArea
   * que o funcionário está trabalhando,
   * sempre irá exibir a informação com base
   * em pacientes novos que ainda não foram
   * visitados.
   */
  exibirInformacoesMicroarea() {
    this.informacoesMicroarea.microArea = this.funcionario.microArea;
    this.informacoesMicroarea.totPacientes = this.pacientesService
      .retornarPacientesNaoVisitados().pipe(

        // Retorna um map em strig para ser exibido
        // na tela para o usuário.
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

  retornarContatos(paciente: Paciente) {
    const contatos = [];
    if (paciente.celular !== '') {
      contatos.push(paciente.celular);
    }
    if (paciente.telefone !== '') {
      contatos.push(paciente.telefone);
    }
    if (paciente.email !== '') {
      contatos.push(paciente.email);
    }
    return contatos.join(' | ');
  }

  /**
   * Faz uma listagem dos pacientes, e também, retorna os
   * dados do endereço com base no cadastro de residências,
   * compara o código da família, com o que está no servidor.
   */
  listarPacientes() {
    this.pacientesService.retornarPacientesComConsulta().pipe(
      tap(pacientes => pacientes.forEach(
        paciente => {
          this.residenciasService.retornarResidenciaPorFamilia(paciente.familia).pipe(
            tap(residencia => {

              // Lista de propriedades para serem ignoradas.
              const ignore = ['cor', 'familia', 'idResidencia', 'complemento'];

              // Armazena os componentes do endereço que serão exibidos.
              const endereco = [];

              // Armazena as informações da microArea.
              let microArea: MicroArea;

              // Itera cada propriedade do objeto residencia que
              // o servidor retornou.
              for (const conteudo in residencia) {

                // Compara se a propiedade não está presente
                // na lista de ignorados e se o conteúdo da
                // propriedade é maior que 0.
                if (ignore.indexOf(conteudo) === -1 && residencia[conteudo] !== '') {

                  // Caso seja microArea a propriedade
                  // adiciona o valor na variável de
                  // mesmo nome.
                  if (conteudo === 'microArea') {
                    microArea = residencia[conteudo];
                  } else {
                    endereco.push(residencia[conteudo]);
                  }
                }
              }

              // Remove objetos que possuam valor vazio.
              endereco.forEach(
                (elemento, i) => {
                  if (elemento === '') {
                    endereco.splice(i, 1);
                  }
                }
              );

              // Adiciona no final da lista o nome do bairro,
              // cidade e estado.
              endereco.push(microArea.bairro.nome);
              endereco.push(microArea.bairro.cidade.nome);
              endereco.push(microArea.bairro.cidade.estado.nome);

              // Cria o objeto que será exibido na tela.
              const obj = {
                paciente,
                endereco: endereco.join(' - ')
              };
              this.pacienteInfo.push(obj);
            })
          ).subscribe(
            success => success,
            err => {
              const obj = {
                paciente,
                endereco: null
              };
              this.pacienteInfo.push(obj);
            }
          );
        }
      ))
    ).subscribe(
      success => success,
      err => err
    );
  }

  abrirModalDoPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(PacienteInfoModalComponent, {
      height: '550px',
      width: '900px',
      data: {
        paciente
      }
    });
  }

}

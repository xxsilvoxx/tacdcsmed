import { MedicamentoPessoaService } from './../../services/medicamentoPessoa/medicamento-pessoa.service';
import { CausaPessoaService } from './../../services/causaPessoa/causa-pessoa.service';
import { FamiliasService } from './../../services/familias/familias.service';
import { Paciente } from './../../models/paciente.model';
import { Familia } from "./../../models/familia.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-dados-familia-modal",
  templateUrl: "./dados-familia-modal.component.html",
  styleUrls: ["./dados-familia-modal.component.scss"],
})
export class DadosFamiliaModalComponent implements OnInit {
  familia: Familia;
  responsavel: Paciente;
  listaMembros: any[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private familiaServe: FamiliasService,
  private pessoaServe: CausaPessoaService,
  private mendicamentoServe: MedicamentoPessoaService) {}



  ngOnInit() {
    this.familia = this.data.dados.familia;
    this.responsavel = this.data.dados.responsavel;
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { ViacepService } from '../../../shared/viacep/viacep.service';
import { MensagemValidationService } from '../../../shared/mensagem-validation/mensagem-validation.service';
import { UbsService } from '../../../services/ubs/ubs.service';
import { ubsDisponivelValidator } from '../../../shared/mensagem-validation/form-validations';
import { Ubs } from '../../../models/ubs.model';
import { BairrosService } from '../../../services/bairros/bairros.service';
import { Bairro } from '../../../models/bairro.model';
import { Cidade } from '../../../models/cidade.model';
import { Estado } from '../../../models/estado.model';
import { CidadesService } from '../../../services/cidades/cidades.service';
import { EstadosService } from '../../../services/estados/estados.service';
import { MensagemService } from '../../../shared/mensagem/mensagem.service';
import { Observable, EMPTY } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-ubs',
  templateUrl: './cadastrar-ubs.component.html',
  styleUrls: ['./cadastrar-ubs.component.scss']
})
export class CadastrarUbsComponent implements OnInit {

  formUbs: FormGroup;
  formEndereco: FormGroup;

  bairros: Bairro[];
  cidades: Cidade[];
  estados: Estado[];

  filtroBairros: Observable<any[]>;

  maskCep = [];
  maskTel = [];

  constructor(
    private dialogRef: MatDialogRef<CadastrarUbsComponent>,
    private builder: FormBuilder,
    private viacep: ViacepService,
    private validation: MensagemValidationService,
    private msg: MensagemService,
    private service: UbsService,
    private bairrosService: BairrosService,
    private cidadesService: CidadesService,
    private estadosService: EstadosService
  ) { }

  ngOnInit() {
    this.criarFormularios();
    this.criarMascaras();
    this.listarBairros();
    this.listarCidades();
    this.listarEstados();
    this.filtrarBairros();
  }

  retornarValidacoes(control: FormControl, label: string) {
    return this.validation.getErrorMessage(control, label);
  }

  criarFormularios() {
    this.formUbs = this.builder.group({
      idUbs: [null],
      nome: [null, {
        validators: [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(3)
        ],
        asyncValidators: [ ubsDisponivelValidator(this.service) ]
      }],
      descricao: [null]
    });

    this.formEndereco = this.builder.group({
      cep: [null, {
        validators: [Validators.required, Validators.minLength(9)]
      }],
      bairro: [null, {
        validators: [Validators.required]
      }],
      logradouro: [null, {
        validators: [Validators.required]
      }],
      telefone: [null, {
        validators: [ Validators.required, Validators.minLength(13) ]
      }]
    });
  }

  /**
   * Método que faz a requisição para o viacep
   * ele retorna o JSON com as informações do endereço
   */
  buscarCep(cep: string) {
    if (cep.length === 9) {
      this.viacep.buscarPorCep(cep).subscribe(
        res => {
          if (this.bairros.map(v => v.nome !== res.bairro)) {
            const bairro = new Bairro();
            const cidade = new Cidade();
            const estado = new Estado();
            cidade.nome = res.localidade;
            estado.nome = res.uf;
            bairro.nome = res.bairro ? res.bairro : null;
            if (bairro.nome !== null) {
              bairro.cidade = cidade;
              bairro.cidade.estado = estado;
              this.bairros.push(bairro);
            } else {
              // Caso não traga nenhum bairro junto com o cep
              // o que é comum com cidades que possuem um único cep
              // é inserido um registro na lista de bairros com '.'
              bairro.nome = '.';
              bairro.cidade = cidade;
              bairro.cidade.estado = estado;
              this.bairros.push(bairro);
            }
          }
          // O patchValue foi a melhor opção porque
          // ele modifica somente os campos que eu passo
          // enquanto que o setValue é obrigatório passar
          // todos os campos do formulário
          this.formEndereco.patchValue({
            cep: res.cep,
            bairro: res.bairro ? res.bairro : null,
            logradouro: res.logradouro ? res.logradouro : null
          });
        },
        err => this.msg.exibirMensagem('O serviço do viacep não conseguiu retornar os dados', 'error')
      );
    }
  }

  // Método que valida as informações vindas do viacep
  // atribuindo cidade, estado, bairro de mesmo nome
  // caso os mesmos já estejam cadastrados no sistema
  // assim evitando a duplicação de registros
  validarPropriedadesExistentes(bairroRetornado: Bairro) {
    const cidade = this.cidades.filter(c => c.nome === bairroRetornado.cidade.nome);
    const estado = this.estados.filter(e => e.nome === bairroRetornado.cidade.estado.nome);
    console.log(cidade);
    console.log(estado);
    if (cidade.length > 0) {
      bairroRetornado.cidade = cidade[0];
    }
    if (estado.length > 0) {
      bairroRetornado.cidade.estado = estado[0];
    }
    return bairroRetornado;
  }

  // Lista todos os bairros cadastrados no sistema
  listarBairros() {
    this.bairrosService.listarTodos().subscribe(
      res => this.bairros = res,
      err => this.msg.exibirMensagem('Erro ao buscar os bairros', 'error')
    );
  }

  // Lista todas as cidades cadastradas no sistema
  listarCidades() {
    this.cidadesService.listar().subscribe(
      res => this.cidades = res,
      err => this.msg.exibirMensagem('Erro ao buscar as cidades', 'error')
    );
  }

  // Lista todos os estados cadastrados no sistema
  listarEstados() {
    this.estadosService.listar().subscribe(
      res => this.estados = res,
      err => this.msg.exibirMensagem('Erro ao buscar os estados', 'error')
    );
  }

  /**
   * Método que cria um observable pro campo de bairro, recebe cada valor
   * observando o evento de valueChanges
   */
  filtrarBairros() {
    this.filtroBairros = this.formEndereco.get('bairro').valueChanges.pipe(
      startWith(''),
      map(value => this._filtro(value))
    );
  }

  /**
   * Método que aplica o filtro na minha lista de bairros já cadastrados
   */
  private _filtro(valor: string) {
    let filterValue;
    // A validação é apenas pra não dar erro quando o campo estiver vazio
    if (valor) {
      filterValue = valor.toLowerCase();
    }
    // Validação pra quando a lista de bairros não estiver carregada
    if (this.bairros) {
      return this.bairros.filter(bairro => bairro.nome.toLowerCase().includes(filterValue));
    }
  }

  cadastrarUbs() {
    const ubs = this.formUbs.value as Ubs;
    const endereco = this.formEndereco.value;
    const descricao = [];
    // tslint:disable-next-line: forin
    for (const info in endereco) {
      descricao.push(endereco[info]);
    }
    ubs.descricao = descricao.join(' - ');
    // Verifica se o bairro do endereço está presente na lista, e o retorna com
    // as informações de cidade e estado pra fazer a verificação.
    let presente = this.bairros.filter(b => b.nome === endereco.bairro);

    // No caso de estar sendo inserido um novo bairro pra uma cidade
    // de um único cep, ele pega o registro que está com o nome do bairro
    // '.', e atribui o nome do bairro inserido pelo template.
    if (presente.length === 0) {
      presente = this.bairros.filter(b => b.nome === '.');
      if (presente.length > 0) {
        presente[0].nome = endereco.bairro;
        presente[0] = this.validarPropriedadesExistentes(presente[0]);
      }
    }

    // Caso o estado passado não esteja cadastrado, consequentemente a cidade
    // e o bairro não estão, através do switchMap vou fazendo uma requisição
    // pra cada um deles.
    if (presente[0].cidade.estado.idEstado === undefined) {
      this.estadosService.cadastrar(presente[0].cidade.estado).pipe(
        switchMap(
          e => e
            ? (presente[0].cidade.estado = e, this.cidadesService.cadastrar(presente[0].cidade))
            : EMPTY
        ),
        switchMap(
          c => c
            ? (presente[0].cidade = c, this.bairrosService.cadastrar(presente[0]))
            : EMPTY
        ),
        switchMap(
          b => b ? this.service.cadastrar(ubs) : EMPTY
        )
      ).subscribe(
        res => {
          this.msg.exibirMensagem('UBS Cadastrada com sucesso', 'info');
          this.dialogRef.close();
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar a UBS', 'error')
      );
      // Caso a cidade não esteja cadastrada
    } else if (presente[0].cidade.idCidade === undefined) {
      this.cidadesService.cadastrar(presente[0].cidade).pipe(
        switchMap(
          c => c
            ? (presente[0].cidade = c, this.bairrosService.cadastrar(presente[0]))
            : EMPTY
        ),
        switchMap(
          b => b ? this.service.cadastrar(ubs) : EMPTY
        )
      ).subscribe(
        res => {
          this.msg.exibirMensagem('UBS Cadastrada com sucesso', 'info');
          this.dialogRef.close();
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar a UBS', 'error')
      );
      // Caso o bairro não esteja cadastrado
    } else if (presente[0].idBairro === undefined) {
      this.bairrosService.cadastrar(presente[0]).pipe(
        switchMap(
          b => b ? this.service.cadastrar(ubs) : EMPTY
        )
      ).subscribe(
        res => {
          this.msg.exibirMensagem('UBS Cadastrada com sucesso', 'info');
          this.dialogRef.close();
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar a UBS', 'error')
      );
      // Caso todas as informações estejam OK
      // ele cai no else onde cadastra apenas a UBS
    } else {
      this.service.cadastrar(ubs).subscribe(
        res => {
          this.msg.exibirMensagem('UBS Cadastrada com sucesso', 'info');
          this.dialogRef.close();
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar a UBS', 'error')
      );
    }
  }

  criarMascaras() {
    this.maskCep = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];
    this.maskTel = ['(', /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  }
}

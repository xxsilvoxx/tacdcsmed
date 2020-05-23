import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, EMPTY, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Familia } from 'src/app/models/familia.model';
import { FamiliasService } from '../../services/familias/familias.service';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { Pais, PaisesService } from '../../services/paises/paises.service';
import { Causa } from '../../models/causa.model';
import { CausasService } from '../../services/causas/causas.service';
import { MedicamentosService } from '../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../models/medicamento.model';
import { Paciente } from '../../models/paciente.model';
import { MedicamentoPessoa, Horario } from '../../models/medicamentoPessoa.model';
import { MensagemValidationService } from '../../shared/mensagem-validation/mensagem-validation.service';
import { MedicamentoPessoaService } from '../../services/medicamentoPessoa/medicamento-pessoa.service';
import { CausaPessoaService } from '../../services/causaPessoa/causa-pessoa.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { CausaPessoa } from '../../models/causaPessoa.model';
import { cpfCnpjDisponivelValidator } from '../../shared/mensagem-validation/form-validations';
import { mascaras } from '../../shared/form-masks/form-masks';
import { converterPraDate } from '../../shared/date-format/date-format';


@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class PacientesFormComponent implements OnInit {

  /**
   * Permite o usuário usar as teclas de enter e backspace
   * com os MatChips para adicionar horários para o medicamento.
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Variável de escopo global que armazena o medicamento selecionado pra salvar na
   * lista de medicamentos do paciente, também é usado pra alterar.
   */
  medicamentoSelecionado: Medicamento = new Medicamento();

  /**
   * Uma variável utilizada pra armazenar o registro que será alterado da lista
   * provisória de medicamentos. Serve apenas como validação.
   */
  registroEditar: MedicamentoPessoa = new MedicamentoPessoa();

  /**
   * Variável responsável apenas por habiliar ou não o botão de editar.
   */
  isEditar = false;

  /**
   * Variável utilizada como mascara para selecionar se o paciente é pessoa Física ou
   * Jurídica.
   */
  tipoPessoa = 'cpf';

  /**
   * Desabilida o botão de responsável familiar, caso a familia selecionada
   * já tiver um responsável escolhido anteriormente.
   */
  disabledResponsavelFamiliar = false;

  /**
   * Mascaras para os campos do formulário, apenas a declaração.
   */
  maskCpf = mascaras.maskCpf;
  maskCnpj = mascaras.maskCnpj;
  maskCel = mascaras.maskCelular;
  maskTel = mascaras.maskTelefone;
  maskHora = mascaras.maskHora;

  /**
   * Variáveis para o layout, usadas pra mostrar se é Alteração ou Adição (padrão).
   */
  tituloModal = 'Adicionar Paciente';
  txtBotao = 'CADASTRAR';

  /**
   * Caso passado por parâmetro o paciente, valida para alterar seus dados.
   */
  paciente: Paciente = new Paciente();

  /**
   * Declaração do formulário do paciente.
   */
  formPaciente: FormGroup;
  formControlCausas = new FormControl();

  /**
   * Observa o evento do botão de editar o medicamento.
   */
  subjectEditarMedicamentos = new Subject<MedicamentoPessoa>();

  /**
   * Observables que recebem listagens do servidor, para serem executados de forma
   * assíncrona.
   */
  familias$: Observable<Familia[]>;
  paises$: Observable<Pais[]>;
  medicamentos$: Observable<Medicamento[]>;

  familias: Familia[];
  causas: Causa[];

  /**
   * Armazena os medicamentos selecionados, antes de enviar para o servidor
   */
  medicamentosAdicionados: MedicamentoPessoa[] = [];
  /* causasAdicionadas: CausaPessoa[] = []; */

  /**
   * Lista que armazena os tips de horários para cada medicamento
   */
  horarios: Horario[] = [];

  /**
   * Armazena riscos do paciente que serão posteriormente enviados para o servidor
   */
  selectedCausas: Causa[];
  selectedFamilia: Familia = new Familia();
  /**
   * Armazena globalmente os medicamentos e riscos do paciente
   * são utilizadas as listas para depois comparar com o que foi alterado
   * e assim fazer um PUT, POST ou DELETE
   */
  medicamentosDoServer: MedicamentoPessoa[] = [];
  causasDoServer: CausaPessoa[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalRef: MatDialogRef<PacientesFormComponent>,
    private builder: FormBuilder,
    private pacientesService: PacientesService,
    private familiasService: FamiliasService,
    private paisesService: PaisesService,
    private causasService: CausasService,
    private medicamentosService: MedicamentosService,
    private medicamentoPessoaService: MedicamentoPessoaService,
    private causaPessoaService: CausaPessoaService,
    private msgValidation: MensagemValidationService,
    private msg: MensagemService
  ) { }

  ngOnInit() {
    this.paciente = this.data.paciente;
    this.criarFormularios();
    this.verificarView(this.paciente);
    this.listarCausas(this.paciente);
    this.listarFamilias();
    this.listarPaises();
    this.listarMedicamentos();
  }

  criarFormularios() {
    this.formPaciente = this.builder.group({
      idPessoa: [null],
      responsavelFamiliar: [false, Validators.required],
      familia: ['', Validators.required],
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]],
      cpfCnpj: ['', {
        validators: [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(18)
        ],
        asyncValidators: cpfCnpjDisponivelValidator(this.pacientesService)
      }],
      nacionalidade: ['BR', Validators.required],
      sexo: ['M', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.maxLength(20)],
      celular: ['', Validators.maxLength(20)],
      email: ['', [Validators.email, Validators.maxLength(250)]]
    });
  }

  /**
   * Método responsável por trazer as informações do paciente selecionado, para que
   * o usuário possa verificar o que precisa ser mudado.
   */
  verificarView(paciente?: Paciente) {
    if (paciente) {
      this.tituloModal = 'Alterar Paciente';
      this.txtBotao = 'ALTERAR';
      this.formPaciente.setValue({
        idPessoa: paciente.idPessoa,
        responsavelFamiliar: paciente.responsavelFamiliar,
        familia: paciente.familia,
        nome: paciente.nome,
        cpfCnpj: paciente.cpfCnpj,
        nacionalidade: paciente.nacionalidade,
        sexo: paciente.sexo,
        dataNascimento: converterPraDate(paciente.dataNascimento),
        telefone: paciente.telefone,
        celular: paciente.celular,
        email: paciente.email
      });

      if (paciente.cpfCnpj.length > 14) {
        this.tipoPessoa = 'cnpj';
      }

      if (paciente.responsavelFamiliar === false) {
        this.validarReponsavel(paciente.familia);
      }

      this.formPaciente.get('cpfCnpj').clearAsyncValidators();

      this.medicamentoPessoaService.retornarMedicamentos(paciente).subscribe(
        medicamentoPessoa => {
          this.medicamentosAdicionados = medicamentoPessoa;
        },
        err => this.msg.exibirMensagem('Erro ao retornar medicamentos', 'error')
      );

      // Busca os medicamentos pra comparativo
      this.medicamentoPessoaService.retornarMedicamentos(paciente).subscribe(
        medicamentoPessoa => {
          this.medicamentosDoServer = medicamentoPessoa;
        },
        err => this.msg.exibirMensagem('Erro ao retornar medicamentos', 'error')
      );

      // Busca as causas pra comparativo
      this.causaPessoaService.listarCausas(paciente).subscribe(
        causaPessoa => {
          this.causasDoServer = causaPessoa;
        },
        err => this.msg.exibirMensagem('Erro ao retornar riscos', 'error')
      );
    }
  }

  // Método que avalia se está cadastrando ou alterando o usuário
  // Ele é chamado quando o botão de de confirmação na última etapa do
  // cadastro, é pressioando.
  onConfirm() {
    if (this.paciente) {

      // Altera os dados do paciente.
      this.converteDataSemGMT();
      this.pacientesService.alterar(this.formPaciente.value).pipe(
        tap(paciente => {

          // Valida se a lista de medicamentosAdicionados está vazia
          // removendo todas os medicamentos do paciente.
          if (this.medicamentosAdicionados.length === 0) {

            // Itera todos os medicamentos salvos para o paciente
            // e remove todos.
            for (const medicamentoPessoa of this.medicamentosDoServer) {
              this.medicamentoPessoaService.remover(medicamentoPessoa).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao remover o medicamento', 'error')
              );
            }

            // Caso tenha um ou mais registros na lista de medicamentos
            // adicionados, ele itera cada registro.
          } else {

            // Lista que armazena registros que estavam antes
            // e que não foram modificados.
            const registrosMantidos = [] as MedicamentoPessoa[];

            // Lista que armazena registros que estavam antes
            // mas que tiveram seu medicamento ou horários
            // alterados.
            const registrosAlterados = [] as MedicamentoPessoa[];

            // Verifica se possui idMedPessoa, caso não possua
            // significa que é um novo registro, e fica nessa
            // lista.
            const registrosNovos = [] as MedicamentoPessoa[];

            // Lista que armazena registros que forem removidos.
            let registrosRemovidos = [] as MedicamentoPessoa[];

            for (const medicamentoPessoa of this.medicamentosAdicionados) {
              if (medicamentoPessoa.idMedPessoa !== undefined) {

                // Filtra para o registro que possui o mesmo id na lista
                // que armazena os registros originais.
                const registro = this.medicamentosDoServer.filter(value => value.idMedPessoa === medicamentoPessoa.idMedPessoa);

                // Valida se dos registros que já estavam antes
                // tem os mesmos horários, e mesmo medicamento.
                // tslint:disable-next-line: max-line-length
                const igual = (medicamentoPessoa.idMedPessoa === registro[0].idMedPessoa) && (medicamentoPessoa.horarios === registro[0].horarios) && (medicamentoPessoa.medicamento.idMedicamento === registro[0].medicamento.idMedicamento);

                if (igual) {
                  registrosMantidos.push(medicamentoPessoa);
                } else {
                  registrosAlterados.push(medicamentoPessoa);
                }
              } else {
                registrosNovos.push(medicamentoPessoa);
              }
            }

            // Seleciona apenas os elementos que não estão mais na lista
            // de medicamentos adicionados
            // tslint:disable-next-line: max-line-length
            registrosRemovidos = this.medicamentosDoServer.filter(value => !(this.medicamentosAdicionados.map(registro => registro.idMedPessoa).includes(value.idMedPessoa)));

            // Adiciona todos os novos medicamentos.
            registrosNovos.forEach(registro => {
              registro.pessoa = paciente;
              this.medicamentoPessoaService.cadastrar(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao adicionar o medicamento', 'error')
              );
            });

            // Remove todos os medicamentos do servidor
            // que forem escolhidos no angular.
            registrosRemovidos.forEach(registro => {
              /* registro.pessoa = paciente; */
              this.medicamentoPessoaService.remover(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao remover o medicamento', 'error')
              );
            });

            // Altera todos os registros que tiveram
            // ou medicamento, ou horários modificados.
            registrosAlterados.forEach(registro => {
              this.medicamentoPessoaService.alterar(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao alterar o medicamento', 'error')
              );
            });
          }
        }),
        tap(paciente => {

          // Verifica se a lista de causas foi modificada
          // e selecionados todos os riscos para serem
          // removidos.
          if (this.selectedCausas.length === 0) {
            this.causasDoServer.forEach(registro => {
              this.causaPessoaService.removerCausa(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao remover o risco', 'error')
              );
            });

          } else {

            const causasMantidas = [] as CausaPessoa[];
            let causasRemovidas = [] as CausaPessoa[];
            const causasNovas = [] as CausaPessoa[];

            for (const causa of this.selectedCausas) {

              const causasPessoas = this.causasDoServer.filter(value => value.causa.idCausa === causa.idCausa);

              // Verica se o registro possui id de identificação
              // caso não possua, considera-o como novo registro
              if (causasPessoas.length > 0) {

                // Valida se a causa passada da iteração, estava presente
                // já na lista.
                if (this.causasDoServer.map(valor => valor.idCausaPessoa).includes(causasPessoas[0].idCausaPessoa)) {
                  causasMantidas.push(causasPessoas[0]);
                }

              } else {
                const causaPessoa = new CausaPessoa();
                causaPessoa.causa = causa;
                causaPessoa.pessoa = paciente;
                causasNovas.push(causaPessoa);
              }
            }

            // tslint:disable-next-line: max-line-length
            causasRemovidas = this.causasDoServer.filter(value => !(this.selectedCausas.map(registro => registro.idCausa).includes(value.causa.idCausa)));

            causasNovas.forEach(registro => {
              this.causaPessoaService.cadastrar(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao adicionar o risco', 'error')
              );
            });

            causasRemovidas.forEach(registro => {
              this.causaPessoaService.removerCausa(registro).subscribe(
                success => success,
                err => this.msg.exibirMensagem('Erro ao remover o risco', 'error')
              );
            });
          }
        }),
        tap(paciente => this.modalRef.close(paciente))
      ).subscribe(
        res => this.msg.exibirMensagem('Paciente alterado com sucesso', 'check_circle_outline'),
        err => this.msg.exibirMensagem('Erro ao alterar o paciente', 'error')
      );
    } else {

      // cadastra o paciente.
      this.converteDataSemGMT();
      this.pacientesService.cadastrar(this.formPaciente.value).subscribe(
        paciente => {
          this.msg.exibirMensagem('Paciente cadastrado com sucesso', 'done');

          // Itera cada medicamento adicionado dentro do angular, e os envia para o servidor.
          for (const medicamentoPessoa of this.medicamentosAdicionados) {
            medicamentoPessoa.pessoa = paciente;
            this.medicamentoPessoaService.cadastrar(medicamentoPessoa).subscribe(
              success => success,
              err => this.msg.exibirMensagem('Erro ao adicionar medicamentos', 'error')
            );
          }

          let causas: Causa[] = [];
          if (this.formControlCausas.value !== undefined) {
            causas = this.formControlCausas.value as Causa[];
          }

          // Itera cada causa marcada dentro do angular, e as envia para o servidor.
          for (const causa of causas) {
            const causaPessoa = new CausaPessoa();
            causaPessoa.pessoa = paciente;
            causaPessoa.causa = causa;
            this.causaPessoaService.cadastrar(causaPessoa).subscribe(
              success => success,
              err => this.msg.exibirMensagem('Erro ao adicionar riscos', 'error')
            );
          }
          this.modalRef.close(paciente);
        },
        err => this.msg.exibirMensagem('Erro ao cadastrar o paciente', 'error')
      );
    }
  }

  // Método que atua no evento de change do campo que
  // seleciona o tipo de pessoa, Física ou Jurídica.
  alterarTipoPessoa(valor) {
    this.tipoPessoa = valor;
  }

  converteDataSemGMT() {
    // Pega o valor da variável do formulário referente ao nascimento.
    const nascimento = this.formPaciente.get('dataNascimento').value as Date;
    // Reatribuindo somente a data ele está desconsiderando o GMT
    this.formPaciente.get('dataNascimento').setValue(nascimento.setDate(nascimento.getDate()));
  }

  /**
   * Lista provisória dos medicamentos adicionados para o paciente
   * podendo ser modificado antes de enviar para o servidor.
   */
  adicionarMedicamentoNaLista() {
    const obj = new MedicamentoPessoa();
    obj.horarios = this.horarios.map(v => v.hora).join(', ');
    obj.medicamento = this.medicamentoSelecionado;
    if (this.medicamentosAdicionados.indexOf(obj) === -1) {
      this.medicamentosAdicionados.push(obj);
      this.medicamentoSelecionado = null;
      this.horarios = [];
    }
  }

  /**
   * Remove o médicamento da lista na segunda etapa de cadastro ou alteração
   * ele apenas remove dentro do template, o que de fato irá remover
   * será quando for confirmado o cadastro ou alteração do paciente.
   */
  removerMedicamentoDaLista(medicamento: Medicamento) {
    const index = this.medicamentosAdicionados.map(
      v => v.medicamento
    ).indexOf(medicamento);
    if (index >= 0) {
      this.medicamentosAdicionados.splice(index, 1);
    }
    this.medicamentoSelecionado = null;
  }

  selecionarMedicamentoDaLista(medicamento: MedicamentoPessoa) {
    const index = this.medicamentosAdicionados.indexOf(medicamento);
    if (index >= 0) {
      this.registroEditar = medicamento;
      this.isEditar = true;
      this.horarios = medicamento.horarios.split(',').map(v => new Horario(v.trim()));
      this.medicamentoSelecionado = medicamento.medicamento;
    }
  }

  editarMedicamentoDaLista() {
    this.registroEditar.horarios = this.horarios.map(v => v.hora).join(', ');
    this.registroEditar.medicamento = this.medicamentoSelecionado;
    for (let i = 0; i < 2; i++) {
      this.subjectEditarMedicamentos.next(this.registroEditar);
    }
    this.subjectEditarMedicamentos.subscribe(
      v => {
        const index = this.medicamentosAdicionados.map(c => c.medicamento).indexOf(v.medicamento);
        this.medicamentosAdicionados[index] = this.registroEditar;
      }
    );
    this.isEditar = false;
    this.medicamentoSelecionado = null;
    this.horarios = [];
  }

  /**
   * Adiciona os horários para o medicamento selecionado
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.horarios.push({hora: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove um horário utilizando o metodo splice do js
   */
  remove(horario: Horario): void {
    const index = this.horarios.indexOf(horario);
    if (index >= 0) {
      this.horarios.splice(index, 1);
    }
  }

  validarReponsavel(familia: Familia) {
    this.pacientesService.retornarResponsavelFamiliar(familia).subscribe(
      res => {
        if (res != null) {
          this.disabledResponsavelFamiliar = true;
          this.formPaciente.get('responsavelFamiliar').setValue(false);
        } else {
          this.disabledResponsavelFamiliar = false;
        }
      },
      err => this.msg.exibirMensagem('Erro no recurso', 'error')
    );
  }

  // método que observa o change do cpfCnpj
  // valida se o valor dentro do campo é o mesmo que veio do servidor
  // se for diferente ele aplica a validação assíncrona
  validarCpfCnpj() {
    if (this.paciente) {
      this.formPaciente.get('cpfCnpj').setAsyncValidators(cpfCnpjDisponivelValidator(this.pacientesService));
    }
  }

  retornarValidacoes(label: string, campo: FormControl) {
    if (campo.touched || campo.dirty) {
      return this.msgValidation.getErrorMessage(campo, label);
    }
  }

  listarFamilias() {
    this.familiasService.listarTodas().pipe(
      tap(v => {
        if (this.paciente) {
          v.forEach(
            c => {
              if (c.idFamilia === this.paciente.familia.idFamilia) {
                this.formPaciente.get('familia').setValue(c);
              }
            }
          );
        }
      })
    ).subscribe(
      res => {
        if (res.length === 0) {
          this.msg.exibirMensagem('A lista de famílias está vazia', 'info');
        }
        this.familias = res;
      },
      err => this.msg.exibirMensagem('Erro ao carregar as famílias', 'error')
    );
  }

  listarPaises() {
    this.paises$ = this.paisesService.listarPaises().pipe(
      tap(v => v.length === 0 ? this.msg.exibirMensagem('A Lista de Países Está Vazia', 'info') : EMPTY)
    );
  }

  /**
   * Lista todas as causas cadastradas, e já faz a parte de listar as causas do paciente
   */
  listarCausas(paciente: Paciente) {
    this.causasService.listarCausas().pipe(
      tap(v => {
        if (paciente) {
          this.causaPessoaService.listarCausas(paciente).subscribe(
            causaPessoa => {
              this.formControlCausas.setValue(causaPessoa);
              const list: CausaPessoa[] = this.formControlCausas.value;
              const newList = list.map(c => c.causa);
              this.selectedCausas = new Array<Causa>();
              v.forEach(
                (causaServer) => {
                  newList.forEach(
                    (causaPaciente) => {
                      if (causaPaciente.idCausa === causaServer.idCausa) {
                        if (this.selectedCausas.indexOf(causaServer) === -1) {
                          this.selectedCausas.push(causaServer);
                        }
                      } else {
                        return;
                      }
                    }
                  );
                }
              );
            },
            err => {
              this.msg.exibirMensagem('Erro ao retornar riscos', 'error');
            }
          );
        }
      })
    ).subscribe(
      res => {
        if (res.length > 0) {
          this.causas = res;
        } else {
          this.msg.exibirMensagem('A Lista de Medicamentos Está Vazia', 'info');
        }
      },
      err => this.msg.exibirMensagem('Erro ao retornar as familias', 'error')
    );
  }

  listarMedicamentos() {
    this.medicamentos$ = this.medicamentosService.listarMedicamentos().pipe(
      tap(v => v.length === 0 ? this.msg.exibirMensagem('A Lista de Medicamentos Está Vazia', 'info') : EMPTY)
    );
  }
}

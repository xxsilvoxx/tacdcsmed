import { FormControl } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { MedicamentosService } from '../../services/medicamentos/medicamentos.service';
import { MicroAreasService } from '../../services/microAreas/microArea.service';
import { CausasService } from '../../services/causas/causas.service';
import { FuncoesService } from '../../services/funcoes/funcoes.service';
import { UbsService } from '../../services/ubs/ubs.service';

/* --------------------------------------------------------------------------------------- */

// Validações assincronas

/* --------------------------------------------------------------------------------------- */

// Validação pra mostrar se o login está disponivel
// Percore no banco pra todos os funcionários
export const loginDisponivelValidator = (service: FuncionariosService) => {
  return (input: FormControl) => {
    return service.verificarLogin(input.value).pipe(
      map(res => {
        return res ? null : { loginInvalido: true };
      })
    );
  };
};

export const emailDisponivelValidator = (service: FuncionariosService) => {
  return (input: FormControl) => {
    return service.verificarEmail(input.value).pipe(
      map(res => {
        return res ? null : { emailInvalido: true };
      })
    );
  };
};

export const cpfCnpjDisponivelValidator = (service: PacientesService) => {
  return (input: FormControl) => {
    return service.retornarCpfCnpjValido(input.value).pipe(
      map(res => {
        return res ? null : { cpfCnpjInvalido: true };
      })
    );
  };
};

export const medicamentoDisponivelValidator = (service: MedicamentosService) => {
  return (input: FormControl) => {
    return service.validarNomeMedicamentoValido(input.value).pipe(
      map(res => {
        return res ? null : { medicamentoInvalido: true };
      })
    );
  };
};

export const microareaDisponivelValidator = (service: MicroAreasService, campo: string) => {
  return (input: FormControl) => {
    let bairro: FormControl;
    let numero: FormControl;
    if (campo === 'bairro') {
      bairro = input.root.get(campo) as FormControl;
      numero = input;
    } else if (campo === 'numero') {
      bairro = input;
      numero = input.root.get(campo) as FormControl;
    }

    return (numero.value !== null && bairro.value !== null)
      ? service.validarNumeroMicroareaDisponivel(numero.value, bairro.value).pipe(
        map(res => {
          return res ? null : { microareaInvalida: true };
        })
      )
      : EMPTY;
  };
};

export const causaDisponivelValidator = (service: CausasService) => {
  return (input: FormControl) => {
    return service.validarCausaDisponivel(input.value).pipe(
      map(res => {
        return res ? null : { causaInvalida: true };
      })
    );
  };
};

export const funcaoDisponivelValidator = (service: FuncoesService) => {
  return (input: FormControl) => {
    return service.validarFuncaoDisponivel(input.value).pipe(
      map(res => {
        return res ? null : { funcaoInvalida: true };
      })
    );
  };
};

export const ubsDisponivelValidator = (service: UbsService) => {
  return (input: FormControl) => {
    return input.value.length >= 5 ? service.validarUbsDisponivel(input.value).pipe(
      map(res => {
        return res ? null : { ubsInvalida: true };
      })
    ) : EMPTY;
  };
};
/* --------------------------------------------------------------------------------------- */

// # Validações sincronas

/* --------------------------------------------------------------------------------------- */

/**
 * Validação do valor do campo input, para que o valor seja
 * maior que 0.
 */
export const validarNumeroMinimo = (control: FormControl) => {
  if (control.value !== null) {
    if (control.value <= 0) {
      return { numeroInvalido: true };
    }
  }
  return null;
};

/**
 * Valida se as senhas condizem, retornando um erro
 * para a tela, caso o usuário tenha colocado senhas
 * diferentes.
 */
export const validarSenhasDiferentes = (otherField: string) => {
  return (confirmarSenha: FormControl) => {
    const senha = confirmarSenha.root.get(`${otherField}`);
    if (confirmarSenha.value !== null && senha.value !== null) {
      if (confirmarSenha.value !== senha.value) {
        return { senhaDiferente: true };
      }
    }
    return null;
  };
};

/**
 * Método que compara a senha original
 * com a atual senha do usuário.
 */
export const validarSenhaDiferenteOriginal = (original: string) => {
  return (senha: FormControl) => {
    if (senha.value === original) {
      return { igualOriginal: true };
    }
    return null;
  };
};

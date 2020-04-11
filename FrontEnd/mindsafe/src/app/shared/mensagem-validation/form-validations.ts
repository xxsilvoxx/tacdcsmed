import { FormControl } from '@angular/forms';
import { timer, EMPTY } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { MedicamentosService } from '../../services/medicamentos/medicamentos.service';
import { MicroAreasService } from '../../services/microAreas/microArea.service';
import { CausasService } from '../../services/causas/causas.service';
import { FuncoesService } from '../../services/funcoes/funcoes.service';

/* --------------------------------------------------------------------------------------- */

// Validações assincronas

/* --------------------------------------------------------------------------------------- */

// Validação pra mostrar se o login está disponivel
// Percore no banco pra todos os funcionários
export const loginDisponivelValidator = (service: FuncionariosService, time: number = 500) => {
  return (input: FormControl) => {
    return timer (time).pipe(
      switchMap(() => service.verificarLogin(input.value)),
      map(res => {
        return res ? null : { loginInvalido: true };
      })
    );
  };
};

export const emailDisponivelValidator = (service: FuncionariosService, time: number = 500) => {
  return (input: FormControl) => {
    return timer (time).pipe(
      switchMap(() => service.verificarEmail(input.value)),
      map(res => {
        return res ? null : { emailInvalido: true };
      })
    );
  };
};

export const cpfCnpjDisponivelValidator = (service: PacientesService, time: number = 500) => {
  return (input: FormControl) => {
    return timer (time).pipe(
      switchMap(() => (input.value.length === 14 || input.value.length === 18)
      ? service.retornarCpfCnpjValido(input.value)
      : null),
      map(res => {
        return res ? null : { cpfCnpjInvalido: true };
      })
    );
  };
};

export const medicamentoDisponivelValidator = (service: MedicamentosService, time: number = 500) => {
  return (input: FormControl) => {
    return timer (time).pipe(
      switchMap(() => service.validarNomeMedicamentoValido(input.value)),
      map(res => {
        return res ? null : { medicamentoInvalido: true };
      })
    );
  };
};

export const microareaDisponivelValidator = (service: MicroAreasService) => {
  return (input: FormControl) => {
    return input.value ? service.validarNumeroMicroareaDisponivel(input.value).pipe(
      map(res => {
        return res ? null : { microareaInvalida: true };
      })
    ) : EMPTY;
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
/* --------------------------------------------------------------------------------------- */

// Validações sincronas

/* --------------------------------------------------------------------------------------- */

/**
 * Validação do valor do campo input, para que o valor seja
 * maior que 0.
 */
export const validarNumeroMinimo = (control: FormControl) => {
 if (control.value <= 0) {
   return { numeroInvalido: true };
 }
 return null;
}


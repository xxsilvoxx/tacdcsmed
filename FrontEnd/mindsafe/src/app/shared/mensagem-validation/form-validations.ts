import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { PacientesService } from '../../services/pacientes/pacientes.service';
import { MedicamentosService } from '../../services/medicamentos/medicamentos.service';

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

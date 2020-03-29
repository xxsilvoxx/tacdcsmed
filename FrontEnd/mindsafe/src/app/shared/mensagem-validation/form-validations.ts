import { FuncionariosService } from '../../services/funcionarios/funcionarios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { ProgressBarService } from './progress-bar.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(
    private progressBar: ProgressBarService
  ) { }

  // Consegue interceptar alguma requisição e enquanto ela
  // não for finalizada, exibe o progress-bar.
  // Caso de um erro ou for finalizada com êxito, esconde
  // a barra.
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.progressBar.show();

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.progressBar.hide();
        }
      },
      err => {
        this.progressBar.hide();
      })
    );
  }
}

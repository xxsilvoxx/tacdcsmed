import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { VisitasModule } from './visitas/visitas.module';
import { SharedModule } from './shared/shared.module';
import { ProgressBarInterceptor } from './shared/progress-bar/progress-bar-interceptor.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    VisitasModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: window.navigator.language },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

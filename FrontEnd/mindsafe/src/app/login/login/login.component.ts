import { Component, OnInit } from '@angular/core';

import { Funcionario } from '../../models/funcionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  senhaViziveu = false;
  funcionario: Funcionario = new Funcionario();

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  vizualizarSenha() {
    this.senhaViziveu = !this.senhaViziveu;
  }

  logar() {
    console.log('Efetuando login');
    this.route.navigate(['mindsafe']);
  }

}

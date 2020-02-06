import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();

  constructor(

  ) { }

  ngOnInit() {
  }

  logar() {

  }

}

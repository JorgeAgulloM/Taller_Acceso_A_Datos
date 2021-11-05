import { LoginService } from 'src/app/services/login.service';
import { LoginModel } from './model/login.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'psp-taller';

  usuario!: LoginModel | null

  constructor(
    private loginService: LoginService

  ){
    loginService.login.subscribe( usuario => this.usuario = usuario )
  }

  hayUsuario(): boolean {
    return this.usuario != null
  }

  logout(): void {
    this.loginService.performLogut()
  }

}

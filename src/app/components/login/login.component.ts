import { LoginModel } from './../../model/login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  enviado: boolean = false
  error: boolean = false
  msgError! : string | null
  isLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  submitForm(){
    this.enviado = true

    if (!this.loginForm.valid)
      return

    this.isLoading = true

    this
    .loginService
    .performLogin(new LoginModel(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value, ''))
    .subscribe( response => {
      console.log(JSON.stringify(response))
      this.error = false
      this.msgError = null
      this.isLoading = false
    }, error => {
      console.log('ERROR: ' + JSON.stringify(error))
      this.error = true
      this.msgError = `(⚠️)Error al iniciar sesión, Intentalo de nuevo! (${error.error.error})`
      this.isLoading = false
    }, () => {
      this.isLoading = false
    }
    )

  }

}

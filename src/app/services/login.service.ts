import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../model/login.model';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

const LOGIN_KEY: string = '/login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginModelBehaviorSubject: BehaviorSubject<LoginModel | null>
  public login: Observable<LoginModel | null> // hay alguien logado o no?

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loginModelBehaviorSubject = new BehaviorSubject<LoginModel | null>(JSON.parse(<string>localStorage?.getItem(LOGIN_KEY))) //TODO
    this.login = this.loginModelBehaviorSubject.asObservable()
  }

  performLogin(entrada: LoginModel): Observable<LoginModel>{
    console.log('performLogin(' + JSON.stringify(entrada) + ')')

    return this
    .http
    .post<LoginModel>(environment.loginUrl, entrada )
    .pipe(map(returnAPI => {
      //Hacer algo
      console.log('Login OK: ' + JSON.stringify(returnAPI))
      this.loginModelBehaviorSubject.next(returnAPI)
      localStorage.setItem(LOGIN_KEY, JSON.stringify(returnAPI))
      return returnAPI
    }))
  }

  performLogut(): void {
    localStorage.removeItem(LOGIN_KEY)
    this.loginModelBehaviorSubject.next(null)
    this.router.navigate(['/login'])
  }

}

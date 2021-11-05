import { LoginModel } from './../model/login.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  usuario!: LoginModel | null
  token!: string | undefined

  constructor(private loginService: LoginService) {
    this.loginService.login.subscribe( usuario => {
      this.usuario = usuario;
      this.token = this.usuario?.token
    })

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.token !== undefined){
      request = request.clone({
        setHeaders: {
          Authorizatacion: `Basic ${this.token}`
        }
      })
    }

    return next.handle(request).pipe(tap( e=>{}), finalize( ()=> {
      console.log(request.url + `(metodo ${request.method} ha finalizaxo)`)
    })); //tap encadena algo pero termina ahí
  }
}

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient,  HttpParams} from "@angular/common/http";

import { UserResponseModel} from '../model/user-respoonse.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }


  getUsers(page: number): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>('https://reqres.in/api/users', {
      params: new HttpParams()
        .set('page', page)
        .set('delay', 3),
    });
  }


}

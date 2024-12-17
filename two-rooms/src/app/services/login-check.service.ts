import { Injectable } from '@angular/core';
import { LoginForm, UserResponce } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor() { }

  checkUser(loginForm: LoginForm, users: UserResponce) {
    for (let user of users.results) {
      if (user.email === loginForm.email) {
        console.log('check completed')
      } else {
        console.log('check doen\'t completed')
      }
    }
  }
}

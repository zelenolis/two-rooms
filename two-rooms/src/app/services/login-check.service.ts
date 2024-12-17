import { Injectable } from '@angular/core';
import { UserResponce } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  constructor() { }

  checkUser(logindata: any, users: UserResponce) {
    for (let user of users.results) {
      if (user.email === logindata.email) {
        console.log('check completed')
      } else {
        console.log('check doen\'t completed')
      }
    }
  }
}

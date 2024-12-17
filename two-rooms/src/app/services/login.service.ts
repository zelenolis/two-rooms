import { Injectable, inject } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { GetHttpService } from './get-http.service'
import { LoginCheckService } from './login-check.service'
import { UserResponce } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly getHttpService = inject(GetHttpService)
  private readonly loginCheckService = inject(LoginCheckService)

  constructor(
  ) {}

  private readonly url = 'https://parseapi.back4app.com/classes/team'

  loginChecks(logindata: object) {
    this.getHttpService.getRequest(this.url).subscribe((res: UserResponce) => {
      this.loginCheckService.checkUser(logindata, res)
    })
  }

  /*
  getUsers(): Observable<object> {
    return this.http.get(this.backUrl)
  }
    */
  //1. getUsers
  //2. check login with gets
  //3. create localstorage token
  //4. get store
  //5. redirect to dashboard
}

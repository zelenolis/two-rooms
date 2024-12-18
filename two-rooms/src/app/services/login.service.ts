import { Injectable, OnDestroy, inject } from '@angular/core'
import { switchMap, takeWhile, tap } from 'rxjs'
import { GetHttpService } from './get-http.service'
import { LoginCheckService } from './login-check.service'
import { LoginForm, UserResponce } from '../interfaces/interfaces'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly getHttpService = inject(GetHttpService)
  private readonly loginCheckService = inject(LoginCheckService)
  private readonly router = inject(Router)

  private readonly logUrl = 'https://parseapi.back4app.com/classes/team'
  private readonly storeUrl = 'https://parseapi.back4app.com/classes/booking'

  loginChecks(loginForm: LoginForm) {

    let isLogged = true

    const getLogged = this.getHttpService.getRequest(this.logUrl)
    getLogged.pipe(
      tap((res: UserResponce) => {
        if (!this.loginCheckService.checkUser(loginForm, res)) {
          isLogged = false
          this.router.navigate(["/registration"])
        }
      }),
      takeWhile(() => isLogged),
      switchMap(() => this.getHttpService.getRequest(this.storeUrl)),
      tap((data: UserResponce) => {
        console.log(data)
      })
    )
    .subscribe()    

  }

  //1. getUsers                   +
  //2. check login with gets      +
  //3. create localstorage token  +
  //4. get store                  ...
  //5. redirect to dashboard      ...
}

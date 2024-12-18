import { inject, Injectable } from '@angular/core';
import { LoginForm, UserResponce } from '../interfaces/interfaces';
import { MatSnackBar } from "@angular/material/snack-bar";
import { TeamNameService } from './team-name.service'

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly teamNameService = inject(TeamNameService)

  checkUser(loginForm: LoginForm, users: UserResponce) {
    const userMatch = users.results.find(user => user.email === loginForm.email)
    if (userMatch) {
      localStorage.setItem("logged", userMatch.objectId)
      this.matSnackBar.open("logged succesfully", "OK", { duration: 3000 })
      this.teamNameService.setName(userMatch.name)
      return true
    } else {
      this.matSnackBar.open("user not found", "OK", { duration: 3000 })
      return false
    }
  }
}

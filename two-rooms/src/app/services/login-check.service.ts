import { inject, Injectable } from '@angular/core';
import { LoginForm, UserResponce } from '../interfaces/interfaces';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  checkUser(loginForm: LoginForm, users: UserResponce) {
    const userMatch = users.results.find(user => user.email === loginForm.email)
    if (userMatch) {
      localStorage.setItem("logged", userMatch.ID)
      this.matSnackBar.open("logged succesfully", "OK", { duration: 3000 })
      this.router.navigate([""])
    } else {
      this.matSnackBar.open("user not found", "OK", { duration: 3000 })
      this.router.navigate(["/registration"])
    }
  }
}

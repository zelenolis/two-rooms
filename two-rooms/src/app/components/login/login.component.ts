import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from '../../services/login.service'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly router = inject(Router)
  private readonly loginService = inject(LoginService)
  hidden = true

  onSubmit(form: any) {
    console.log(form.value)
    this.hidden = !this.hidden
    /*
    this.loginService.getUsers().subscribe((res) => {
      console.log(res)
    })
      */
  }
  onClick() {
    this.router.navigate(['/registration'])
  }
}

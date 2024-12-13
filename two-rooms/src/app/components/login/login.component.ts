import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router = inject(Router)


  onSubmit(form: any) {
    console.log(form.value)
  }
  onClick() {
    this.router.navigate(["/registration"])
  }
}

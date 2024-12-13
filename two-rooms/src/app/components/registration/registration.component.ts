import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private readonly router = inject(Router)
  
  onSubmit(form: any) {
    console.log(form.value)
  }
  onClick() {
    this.router.navigate(["/registration"])
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  hidden = true;

  onSubmit(form: any): void {
    this.hidden = !this.hidden;

    this.loginService.loginChecks(form.value);
  }

  onClick(): void {
    this.router.navigate(['/registration']);
  }
}

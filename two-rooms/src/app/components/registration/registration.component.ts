import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  private readonly router = inject(Router);
  private readonly registrationService = inject(RegistrationService);

  onSubmit(form: any): void {
    this.registrationService.onRegister(form.value);
  }
  onClick(): void {
    this.router.navigate(['/login']);
  }
}

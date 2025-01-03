import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  private readonly router = inject(Router);

  onSubmit(form: any): void {
    console.log(form.value);
  }
  onClick(): void {
    this.router.navigate(['/login']);
  }
}

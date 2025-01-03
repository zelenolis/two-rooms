import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private readonly regUrl = 'https://parseapi.back4app.com/classes/team';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly matSnackBar = inject(MatSnackBar);

  onRegister(form: any): void {
    this.http
      .post(this.regUrl, { name: form.team, email: form.email })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('res: ', res);
          this.matSnackBar.open('Registarion Succesful', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.matSnackBar.open(err, 'OK', { duration: 3000 });
        },
      });
  }
}

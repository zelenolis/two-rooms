import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Booking } from '../interfaces/interfaces';
import { from, mergeMap, tap, toArray } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addBookAction } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class PushNewBookService {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly storeUrl = 'https://parseapi.back4app.com/classes/booking';

  constructor(private http: HttpClient) {}

  pushRequest(data: Booking[]): void {
    from(data)
      .pipe(
        mergeMap((item) =>
          this.http
            .post<{ objectId: string }>(this.storeUrl, JSON.stringify(item))
            .pipe(
              tap((res) => {
                item.objectId = res.objectId;
                this.store.dispatch(addBookAction({ newBook: item }));
              }),
            ),
        ),
        toArray(),
      )
      .subscribe({
        next: () => {
          this.matSnackBar.open('Date(s) succesfully booked', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['']);
        },
        error: () => {
          this.matSnackBar.open('Error sending data', 'OK', { duration: 3000 });
          this.router.navigate(['']);
        },
      });
  }
}

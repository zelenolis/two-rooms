import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { delBookAction } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class DeleteItemService {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  private readonly url = 'https://parseapi.back4app.com/classes/booking/';

  constructor(private http: HttpClient) {}

  delRequest(id: string | undefined) {
    if (!id) {
      return;
    }
    const idUrl = this.url + id;
    this.http.delete(idUrl).subscribe({
      next: () => {
        this.store.dispatch(delBookAction({ delId: id }));
        this.matSnackBar.open('deleted succesfully', 'OK', { duration: 3000 });
      },
      error: () => {
        this.matSnackBar.open('something went wrong', 'OK', { duration: 3000 });
      },
    });
  }
}

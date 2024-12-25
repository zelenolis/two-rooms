import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { SendBooking } from '../interfaces/interfaces'
import { from, mergeMap, toArray } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class PushNewBookService {
  private readonly matSnackBar = inject(MatSnackBar)
  private readonly router = inject(Router)
  private readonly storeUrl = 'https://parseapi.back4app.com/classes/booking'

  constructor(private http: HttpClient) {}

  pushRequest(data: SendBooking[]) {
    from(data)
      .pipe(
        mergeMap((item) => this.http.post(this.storeUrl, JSON.stringify(item))),
        toArray(),
      )
      .subscribe({
        next: (res) => {
          console.log(res)
          this.matSnackBar.open('Date(s) succesfully booked', 'OK', {
            duration: 3000,
          })
          this.router.navigate([''])
        },
        error: () => {
          this.matSnackBar.open('Error sending data', 'OK', { duration: 3000 })
          this.router.navigate([''])
        },
      })
  }
}

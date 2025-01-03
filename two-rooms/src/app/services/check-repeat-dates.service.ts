import { inject, Injectable } from '@angular/core';
import { SendBooking, Rooms, Booking } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectAllDataTime } from '../store/selectors';
import { PushNewBookService } from './push-new-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CheckRepeatDatesService {
  private readonly store = inject(Store);
  private readonly pushNewBookService = inject(PushNewBookService);
  private readonly matSnackBar = inject(MatSnackBar);

  checkFreeRooms(bookArray: SendBooking[]): void {
    const tempArray: { date: string; time: string }[] = [];
    for (let i = 0; i < bookArray.length; i++) {
      tempArray.push({ date: bookArray[i].date, time: bookArray[i].time });
    }

    this.store.select(selectAllDataTime(tempArray)).subscribe({
      next: (val: Booking[]) => {
        if (this.findEquals(val)) {
          this.matSnackBar.open('Some dates are already booked', 'OK', {
            duration: 3000,
          });
          return;
        }
        for (let i = 0; i < bookArray.length; i++) {
          const currentDate = bookArray[i].date.split('T')[0];
          const currentTime = bookArray[i].time;
          const found = val.filter(
            (item) =>
              item.date.split('T')[0] === currentDate &&
              item.time === currentTime,
          );
          if (found.length > 0) {
            if (bookArray[i].room === Rooms.any) {
              bookArray[i].room =
                found[0].room === Rooms.red ? Rooms.yellow : Rooms.red;
            }
            if (bookArray[i].room === found[0].room) {
              this.matSnackBar.open(
                'Some dates in this room has already booked',
                'OK',
                {
                  duration: 3000,
                },
              );
              return;
            }
          }
          if (bookArray[i].room === Rooms.any) {
            console.log('room assigned');
            bookArray[i].room = Rooms.red;
          }
        }
        this.pushNewBookService.pushRequest(bookArray);
      },
    });
    return;
  }

  findEquals(arr: Booking[]): boolean {
    const seen = new Map();
    for (let obj of arr) {
      const key = `${obj.date}-${obj.time}`;
      if (seen.has(key)) {
        console.log('find ', [seen.get(key), obj]);
        return true;
      }
      seen.set(key, obj);
    }
    return false;
  }
}

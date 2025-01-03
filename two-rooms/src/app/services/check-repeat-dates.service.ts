import { inject, Injectable } from '@angular/core';
import { SendBooking, Rooms, Booking } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectAllDataTime } from '../store/selectors';
import { PushNewBookService } from './push-new-book.service';

@Injectable({
  providedIn: 'root',
})
export class CheckRepeatDatesService {
  private readonly store = inject(Store);
  private readonly pushNewBookService = inject(PushNewBookService);

  checkFreeRooms(room: Rooms, bookArray: SendBooking[]) {
    const tempArray: { date: string; time: string }[] = [];
    for (let i = 0; i < bookArray.length; i++) {
      tempArray.push({ date: bookArray[i].date, time: bookArray[i].time });
    }

    this.store.select(selectAllDataTime(tempArray)).subscribe({
      next: (val: Booking[]) => {
        console.log(val);
        if (val.length < 1) {
          console.log('free');
          return;
        }
        if (val.length > 1) {
          console.log('all rooms booked');
          return;
        }
        const newRoom = val[0].room === Rooms.red ? Rooms.yellow : Rooms.red;
        for (let i = 0; i < bookArray.length; i++) {
          bookArray[i].room = newRoom;
        }
      },
    });
    console.log('bookArray: ', bookArray);
    this.pushNewBookService.pushRequest(bookArray);
    return;
  }
}

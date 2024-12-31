import { inject, Injectable } from '@angular/core';
import { SendBooking, Rooms, RepeatOptions } from '../interfaces/interfaces';
import { TeamNameService } from './team-name.service';
import { PushNewBookService } from './push-new-book.service';

@Injectable({
  providedIn: 'root',
})
export class BookThisService {
  private readonly teamNameService = inject(TeamNameService);
  private readonly pushNewBookService = inject(PushNewBookService);
  private bookArray: SendBooking[] = [];

  checkData(
    date: Date,
    repeatOption: RepeatOptions,
    repeatTimes: number,
    room: Rooms,
  ): void {
    const teamName = this.teamNameService.getName();
    const duration = 1;
    const time =
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0');
    let bookedRoom = Rooms.red;
    if (repeatOption !== RepeatOptions.no && repeatTimes === 0) {
      repeatTimes = 1;
    }
    if (room !== Rooms.any) {
      bookedRoom = room;
    }
    switch (repeatOption) {
      case RepeatOptions.no:
        this.pushData(
          teamName,
          time,
          date.toISOString(),
          duration.toString(),
          bookedRoom,
        );
        break;
      case RepeatOptions.day:
        for (let i = 0; i < repeatTimes; i++) {
          this.pushData(
            teamName,
            time,
            date.toISOString(),
            duration.toString(),
            bookedRoom,
          );
          date.setDate(date.getDate() + 1);
        }
        break;
      case RepeatOptions.week:
        for (let i = 0; i < repeatTimes; i++) {
          this.pushData(
            teamName,
            time,
            date.toISOString(),
            duration.toString(),
            bookedRoom,
          );
          date.setDate(date.getDate() + 7);
        }
        break;
      default:
        break;
    }
    if (this.bookArray.length > 0) {
      this.pushNewBookService.pushRequest(this.bookArray);
      this.bookArray = [];
    }
  }

  private pushData(
    team: string,
    time: string,
    date: string,
    duration: string,
    room: string,
  ): void {
    const item: SendBooking = {
      team: team,
      time: time,
      date: date,
      duration: duration,
      room: room,
    };
    this.bookArray.push(item);
  }
}

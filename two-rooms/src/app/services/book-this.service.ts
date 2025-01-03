import { inject, Injectable } from '@angular/core';
import { SendBooking, Rooms, RepeatOptions } from '../interfaces/interfaces';
import { TeamNameService } from './team-name.service';
import { CheckRepeatDatesService } from './check-repeat-dates.service';

@Injectable({
  providedIn: 'root',
})
export class BookThisService {
  private readonly teamNameService = inject(TeamNameService);
  private readonly checkRepeatDatesService = inject(CheckRepeatDatesService);
  private bookArray: SendBooking[] = [];

  checkData(
    hours: string,
    date: Date,
    repeatOption: RepeatOptions,
    repeatTimes: number,
    room: Rooms,
  ): void {
    const teamName = this.teamNameService.getName();
    const duration = 1;
    let bookedRoom = Rooms.yellow;
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
          hours,
          date.toISOString(),
          duration.toString(),
          room,
        );
        break;
      case RepeatOptions.day:
        for (let i = 0; i < repeatTimes; i++) {
          this.pushData(
            teamName,
            hours,
            date.toISOString(),
            duration.toString(),
            room,
          );
          date.setDate(date.getDate() + 1);
        }
        break;
      case RepeatOptions.week:
        for (let i = 0; i < repeatTimes; i++) {
          this.pushData(
            teamName,
            hours,
            date.toISOString(),
            duration.toString(),
            room,
          );
          date.setDate(date.getDate() + 7);
        }
        break;
      default:
        break;
    }
    if (this.bookArray.length > 0) {
      this.checkRepeatDatesService.checkFreeRooms(room, this.bookArray);
      this.bookArray = [];
    }
  }

  private pushData(
    team: string,
    time: string,
    date: string,
    duration: string,
    room: Rooms,
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

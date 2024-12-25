import { inject, Injectable } from '@angular/core';
import { Rooms, RepeatOptions } from '../interfaces/interfaces';
import { TeamNameService } from './team-name.service';

@Injectable({
  providedIn: 'root'
})
export class BookThisService {
  private readonly teamNameService = inject(TeamNameService)
  
  checkData(date: Date, repeatOption: RepeatOptions, repeatTimes: number, room: Rooms ) {
    const teamName = this.teamNameService.getName()
    const duration = 1
    let bookedRoom = Rooms.red
    if (repeatOption !== RepeatOptions.no && repeatTimes === 0) {
      repeatTimes = 1
    }
    if (room !== Rooms.any) {
      bookedRoom = room
    }
    switch (repeatOption) {
      case RepeatOptions.no:
        // action add
        break
      case RepeatOptions.day:
        for (let i = 0; i < repeatTimes; i++) {
          // action add + i time
        }
        break
      case RepeatOptions.week:
        for (let i = 0; i < repeatTimes; i++) {
          // action add + i time * 7
        }
        break
      default:
        break
    }
    console.log('Date: ', date)
    console.log('repeatOption: ', repeatOption)
    console.log('repeatTimes: ', repeatTimes)
    console.log('room: ', room)
  }

}

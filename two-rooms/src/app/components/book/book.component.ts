import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { BookThisService } from '../../services/book-this.service';
import { Rooms, RepeatOptions, BookTimeRoom } from '../../interfaces/interfaces';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { Store } from '@ngrx/store';
import { selectByDate } from '../../store/selectors';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';
import { TeamNameService } from '../../services/team-name.service';

@Component({
  selector: 'app-book',
  imports: [
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    TimePickerComponent,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent implements OnInit {
  private readonly bookThisService = inject(BookThisService);
  private readonly teamNameService = inject(TeamNameService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private bookDate: Date | undefined;
  private teamName = '';

  protected repeates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected yourBookIs = 'Please select date and time';
  protected closedRooms: string = ''
  protected repeatOption: RepeatOptions = RepeatOptions.no;
  protected repeatTimes = 0;
  protected showRepeats = '';
  protected room: Rooms = Rooms.any;
  protected specialTimes: BookTimeRoom[] = [];
  protected selectedHours: string = '';
  protected disableSelectRoom: boolean = false;
  protected disableBookIt: boolean = true;

  selected = model<Date | null>(null);

  hourSelected(time: string) {
    const freeRoom = this.specialTimes.filter(val => val.time === time)
    if (freeRoom.length < 1) {
      this.disableSelectRoom = false
      this.room = Rooms.any
      this.closedRooms = ''
    }
    if (freeRoom.length === 1) {
      this.room = freeRoom[0].room === 'red' ? Rooms.yellow : Rooms.red
      this.closedRooms = `The ${freeRoom[0].room} room is already booked`
    }
    this.selectedHours = time;
    if (freeRoom.length > 1) {
      this.disableSelectRoom = true;
      this.room = Rooms.any;
      this.disableBookIt = true
      this.yourBookIs = 'Please select date and time';
      this.closedRooms = 'All rooms are already booked'
      return
    }
    this.disableBookIt = false
    this.dateChanged();
  }

  dateChanged() {
    const pick = this.selected();
    const newArr: BookTimeRoom[] = [];
    this.specialTimes = newArr;
    if (pick) {
      const d = new Date(pick);
      this.udateClosedTimes(d);
    }
    if (pick && this.selectedHours) {
      this.disableBookIt = false
      const d = new Date(pick);
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      this.yourBookIs = `Your book is: ${this.selectedHours}, ${day}.${month}.${year}`;
      this.bookDate = new Date(
        year,
        month,
        day,
        +this.selectedHours.split(':')[0],
        +this.selectedHours.split(':')[1],
        0,
        0,
      );
    }
  }

  udateClosedTimes(date: Date) {
    if (!date) {
      return;
    }
    date.setHours(12);
    date.setMinutes(0);
    this.specialTimes.length = 0;
    const bookedDates$ = this.store.select(selectByDate(date.toISOString()));
    bookedDates$
      .pipe(
        take(1),
        map((val) => {
          const newArr: BookTimeRoom[] = [];
          for (const items of val) {
            newArr.push({
              time: items.time,
              room: items.room
            });
            this.specialTimes = newArr;
          }
        }),
      )
      .subscribe();
  }

  timeRepeat(val: number) {
    this.repeatTimes = val;
    this.checkRepeats();
  }

  repeats(val: RepeatOptions) {
    this.repeatOption = val;
    this.checkRepeats();
  }

  checkRepeats() {
    if (
      this.repeatTimes > 0 &&
      this.repeatOption &&
      this.repeatOption !== RepeatOptions.no
    ) {
      this.showRepeats = `Repeat every ${this.repeatOption} ${this.repeatTimes} times`;
    } else {
      this.showRepeats = '';
    }
  }

  onBook() {
    if (this.bookDate) {
      this.bookThisService.checkData(
        this.bookDate,
        this.repeatOption,
        this.repeatTimes,
        this.room,
      );
    }
  }

  onBack() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.teamName = this.teamNameService.getName();
  }

}

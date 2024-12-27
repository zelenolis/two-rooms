import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  ViewEncapsulation,
} from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { NgFor } from '@angular/common'
import { BookThisService } from '../../services/book-this.service'
import { Rooms, RepeatOptions } from '../../interfaces/interfaces'
import { TimePickerComponent } from '../time-picker/time-picker.component'
import { Store } from '@ngrx/store'
import { selectByDate } from '../../store/selectors'
import { map, take } from 'rxjs'
import { Router } from '@angular/router'

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
    TimePickerComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  private readonly bookThisService = inject(BookThisService)
  private readonly store = inject(Store)
  private readonly router = inject(Router)
  private bookDate: Date | undefined

  protected repeates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  protected yourBookIs = 'Please select date and time'
  protected repeatOption: RepeatOptions = RepeatOptions.no
  protected repeatTimes = 0
  protected showRepeats = ''
  protected room: Rooms = Rooms.any
  protected specialTimes: string[] = []
  protected selectedHours: string = ''

  selected = model<Date | null>(null)

  hourSelected(time: string) {
    this.selectedHours = time
    this.dateChanged()
  }

  dateChanged() {
    const pick = this.selected()
    const newArr: string[] = []
    this.specialTimes = newArr
    if (pick) {
      const d = new Date(pick)
      this.udateClosedTimes(d)
    }
    if (pick && this.selectedHours) {
      const d = new Date(pick)
      const year = d.getFullYear()
      const month = d.getMonth()
      const day = d.getDate()
      this.yourBookIs = `Your book is: ${this.selectedHours}, ${day}.${month}.${year}`
      this.bookDate = new Date(
        year,
        month,
        day,
        +this.selectedHours.split(':')[0],
        +this.selectedHours.split(':')[1],
        0,
        0,
      )
    }
  }

  udateClosedTimes(date: Date) {
    if (!date) { return }
    date.setHours(12)
    date.setMinutes(0)
    this.specialTimes.length = 0
    const bookedDates$ = this.store.select(selectByDate(date.toISOString()))
    bookedDates$
      .pipe(
        take(1),
        map((val) => {
          for (const items of val) {
            const newArr = []
            newArr.push(items.time)
            this.specialTimes = newArr
          }
        })
      )
      .subscribe()
  }

  rooms(val: Rooms) {
    this.room = val
  }

  timeRepeat(val: number) {
    this.repeatTimes = val
    this.checkRepeats()
  }

  repeats(val: RepeatOptions) {
    this.repeatOption = val
    this.checkRepeats()
  }

  checkRepeats() {
    if (
      this.repeatTimes > 0 &&
      this.repeatOption &&
      this.repeatOption !== RepeatOptions.no
    ) {
      this.showRepeats = `Repeat every ${this.repeatOption} ${this.repeatTimes} times`
    } else {
      this.showRepeats = ''
    }
  }

  onBook() {
    if (this.bookDate) {
      this.bookThisService.checkData(
        this.bookDate,
        this.repeatOption,
        this.repeatTimes,
        this.room,
      )
    }
  }

  onBack(){
    this.router.navigate([''])
  }

}

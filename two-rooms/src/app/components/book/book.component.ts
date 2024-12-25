import { ChangeDetectionStrategy, Component, inject, model, ViewEncapsulation } from '@angular/core'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import {MatTimepickerModule} from '@angular/material/timepicker'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { NgFor } from '@angular/common'
import { BookThisService } from '../../services/book-this.service'
import { Rooms, RepeatOptions } from '../../interfaces/interfaces'


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
    MatTimepickerModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  private readonly bookThisService = inject(BookThisService)
  private bookDate: Date | undefined

  protected repeates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  protected yourBookIs = 'Please select date and time'
  protected repeatOption: RepeatOptions = RepeatOptions.no
  protected repeatTimes = 0
  protected showRepeats = ''
  protected room: Rooms = Rooms.any

  selected = model<Date | null>(null)
  selectedTime: string | undefined

  dateChanged() {
    const pick = this.selected()
    if (pick && this.selectedTime) {
      const t = new Date(this.selectedTime)
      const hours = t.getHours().toString().padStart(2, '0')
      const min = t.getMinutes().toString().padStart(2, '0')
      const d = new Date(pick)
      const year = d.getFullYear()
      const month = d.getMonth()
      const day = d.getDay()
      this.yourBookIs = `Your book is: ${hours}:${min}, ${day}.${month}.${year}`
      this.bookDate = new Date(Date.UTC(year, month, day, t.getHours(), t.getMinutes(), 0))
    }
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
    if (this.repeatTimes > 0 && this.repeatOption && this.repeatOption !== RepeatOptions.no) {
      this.showRepeats = `Repeat every ${this.repeatOption} ${this.repeatTimes} times`
    } else {
      this.showRepeats = ''
    }
  }

  onBook() {
    if( this.bookDate ) {
      this.bookThisService.checkData(this.bookDate, this.repeatOption, this.repeatTimes, this.room)
    }
  }

}

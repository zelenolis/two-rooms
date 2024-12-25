import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import {MatTimepickerModule} from '@angular/material/timepicker'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { NgFor } from '@angular/common'


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
  protected repeates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  protected yourBookIs = 'Please select date and time'
  protected repeatOption = ''
  protected repeatTimes = 0
  protected showRepeats = ''
  protected room = 'any'

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
      console.log(`${hours}:${min}, ${day}.${month}.${year}`)
    }
  }

  rooms(val: string) {
    this.room = val
  }

  timeRepeat(val: number) {
    this.repeatTimes = val
    this.checkRepeats()
  }

  repeats(val: string) {
    this.repeatOption = val
    this.checkRepeats()
  }

  checkRepeats() {
    if (this.repeatTimes > 0 && this.repeatOption && this.repeatOption !== 'no repeat') {
      this.showRepeats = `Repeat every ${this.repeatOption} ${this.repeatTimes} times`
    } else {
      this.showRepeats = ''
    }
  }

}

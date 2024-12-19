import { ChangeDetectionStrategy, Component } from '@angular/core'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatTimepickerModule} from '@angular/material/timepicker'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-book',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule, MatTimepickerModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  selectedDate: Date | undefined
  selectedTime: string | undefined

  dateChanged() {
    if (this.selectedDate && this.selectedTime) {
      const t = new Date(this.selectedTime)
      const hours = t.getHours().toString().padStart(2, '0')
      const min = t.getMinutes().toString().padStart(2, '0')
      const d = new Date(this.selectedDate)
      const year = d.getFullYear()
      const month = d.getMonth()
      const day = d.getDay()
      console.log(` ${hours}:${min}, ${day}.${month}.${year}`)
    }
  }
}

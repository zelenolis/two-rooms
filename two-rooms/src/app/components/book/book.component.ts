import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatTimepickerModule} from '@angular/material/timepicker'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'


@Component({
  selector: 'app-book',
  imports: [MatCardModule, MatInputModule, MatDatepickerModule, FormsModule, MatTimepickerModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
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
      console.log(` ${hours}:${min}, ${day}.${month}.${year}`)
    }
  }
}

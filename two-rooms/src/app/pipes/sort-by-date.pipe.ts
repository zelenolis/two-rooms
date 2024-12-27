import { Pipe, PipeTransform } from '@angular/core'
import { Booking } from '../interfaces/interfaces'

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(dates: Booking[], pickedDate: Date) {
    if (!pickedDate) {
      return dates
    }
    return dates.filter((val) => {
      const newDate = new Date(val.date)
      newDate.setHours(0)
      newDate.setMinutes(0)
      newDate.setSeconds(0)
      return newDate.toISOString() === pickedDate.toISOString()
    })
  }
}

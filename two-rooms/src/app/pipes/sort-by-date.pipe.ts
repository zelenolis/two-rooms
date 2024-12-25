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
    const formatDate = pickedDate.toISOString()
    return dates.filter((val) => val.date === formatDate)
  }
}

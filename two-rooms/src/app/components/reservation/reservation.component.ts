import { Component, Input } from '@angular/core'
import { Booking } from '../../interfaces/interfaces'

@Component({
  selector: 'app-reservation',
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  @Input()
  pickedDate: Booking = {
    objectId: '',
    team: '',
    time: '',
    date: '',
    duration: '',
    room: '',
  }
}

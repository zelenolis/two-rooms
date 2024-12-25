import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { TeamNameService } from '../../services/team-name.service'
import { Store } from '@ngrx/store'
import { selectBooksByTeam } from '../../store/selectors'
import { CommonModule } from '@angular/common'
import { ReservationComponent } from '../reservation/reservation.component'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { map } from 'rxjs'
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatCardModule,
    CommonModule,
    ReservationComponent,
    SortByDatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  selected = model<Date | null>(null)

  myDate: Date = new Date()
  showBooks = false

  private readonly router = inject(Router)
  private readonly store = inject(Store)
  private readonly teamNameService = inject(TeamNameService)

  public teamName = ''
  public bookedDates$ = this.store.select(
    selectBooksByTeam(this.teamNameService.getName()),
  )
  public specialDates: string[] = []

  dateClass = (date: Date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    const formatDate = date.toISOString()
    return this.specialDates.some((val) => val === formatDate)
      ? 'highlight'
      : ''
  }

  selectDate() {
    const pick = this.selected()
    if (pick) {
      const date = new Date(pick)
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      this.myDate = date
      const formatDate = date.toISOString()
      this.specialDates.some((val) => val === formatDate)
        ? (this.showBooks = true)
        : (this.showBooks = false)
    }
  }

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  onBooking() {
    this.router.navigate(['/booking'])
  }

  ngOnInit() {
    this.teamName = this.teamNameService.getName()

    this.bookedDates$
      .pipe(
        map((val) => {
          for (const items of val) {
            this.specialDates.push(items.date)
          }
        }),
      )
      .subscribe()
  }
}

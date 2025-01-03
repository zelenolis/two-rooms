import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TeamNameService } from '../../services/team-name.service';
import { Store } from '@ngrx/store';
import { selectBooksByTeam } from '../../store/selectors';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from '../reservation/reservation.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { map } from 'rxjs';
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe';

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
  selected = model<Date | null>(null);

  myDate: Date = new Date();
  showBooks: boolean = false;

  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly teamNameService = inject(TeamNameService);

  public teamName = '';
  public bookedDates$ = this.store.select(
    selectBooksByTeam(this.teamNameService.getName()),
  );
  public specialDates: string[] = [];

  dateClass = (date: Date): string => {
    const formatDate = date.toISOString();
    return this.specialDates.some((val) => val === formatDate)
      ? 'highlight'
      : '';
  };

  selectDate(): void {
    const pick = this.selected();
    if (pick) {
      const date = new Date(pick);
      this.myDate = date;
      const formatDate = date.toISOString();
      this.showBooks = this.specialDates.some((val) => val === formatDate);
    }
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  onBooking(): void {
    this.router.navigate(['/booking']);
  }

  ngOnInit(): void {
    this.teamName = this.teamNameService.getName();

    this.bookedDates$
      .pipe(
        map((val) => {
          for (const items of val) {
            const newDate = new Date(items.date);
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            this.specialDates.push(newDate.toISOString());
          }
        }),
      )
      .subscribe();
  }
}

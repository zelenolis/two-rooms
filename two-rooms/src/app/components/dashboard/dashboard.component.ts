import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { TeamNameService } from '../../services/team-name.service'
import { MatDatepickerModule, MatCalendarCellClassFunction } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core'

@Component({
  selector: 'app-dashboard',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  
  private readonly router = inject(Router)
  private readonly teamNameService = inject(TeamNameService)
  teamName = 'not defined'

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.teamName = this.teamNameService.getName()
  }

  highlightedDates = [
    new Date(2024, 11, 25), // December 25, 2024
    new Date(2024, 0, 1)    // January 1, 2024
  ];

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'highlighted-date' : ''
    }
    return ''
  };

}

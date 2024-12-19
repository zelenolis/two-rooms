import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TeamNameService } from '../../services/team-name.service'
import { Store } from '@ngrx/store'
import { selectBooksByTeam } from '../../store/selectors'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { ReservationComponent } from '../reservation/reservation.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, ReservationComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  
  private readonly router = inject(Router)
  private readonly store = inject(Store)
  private readonly teamNameService = inject(TeamNameService)

  public teamName = ''
  public bookedDates$ = this.store.select(selectBooksByTeam(this.teamNameService.getName()))

  onLogout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.teamName = this.teamNameService.getName()
  }

}

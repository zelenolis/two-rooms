import { inject, Injectable } from '@angular/core'
import { GetHttpService } from './get-http.service'
import { take, tap } from 'rxjs'
import { UserResponce } from '../interfaces/interfaces'
import { Store } from '@ngrx/store'
import { refreshStateAction } from '../store/actions'

@Injectable({
  providedIn: 'root',
})
export class TeamNameService {
  private readonly getHttpService = inject(GetHttpService)
  private readonly store = inject(Store)
  private readonly storeUrl = 'https://parseapi.back4app.com/classes/booking'

  private teamName = ''

  setName(name: string) {
    this.teamName = name
    localStorage.setItem('teamName', name)
  }

  getName(): string {
    const localName = localStorage.getItem('teamName')
    if (!this.teamName && localName) {
      this.teamName = localName
      this.getHttpService.getRequest(this.storeUrl).pipe(
        take(1),
        tap((data: UserResponce) => {
          const transformData = data.results.map((item) => ({
            objectId: item.objectId,
            team: item.team,
            time: item.time,
            date: item.date,
            duration: item.duration,
            room: item.room,
          }))
          this.store.dispatch(refreshStateAction({ newBooks: transformData }))
        })
      ).subscribe()
    }
    return this.teamName
  }
}

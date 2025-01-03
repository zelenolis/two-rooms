import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetHttpService } from '../services/get-http.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { refreshStateAction, StoreActionsType } from './actions';
import { Booking, UserResponce } from '../interfaces/interfaces';


@Injectable()
export class BookingEffects {
    private actions$ = inject(Actions);
    private getHttpService = inject(GetHttpService);
    private getUrl = 'https://parseapi.back4app.com/classes/booking';

    loadData$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(StoreActionsType.loadBooks),
          exhaustMap(() =>
            this.getHttpService.getRequest(this.getUrl).pipe(
              map((data: UserResponce) => {
                const transformData: Booking[] = data.results.map((item) => ({
                  objectId: item.objectId,
                  team: item.team,
                  time: item.time,
                  date: item.date,
                  duration: item.duration,
                  room: item.room,
                }));
                return refreshStateAction({ newBooks: transformData });
              }),
              catchError(() => of({ type: '[Bookings API] Bookings Loaded Error' }))
            )
          )
        );
      });
    
}
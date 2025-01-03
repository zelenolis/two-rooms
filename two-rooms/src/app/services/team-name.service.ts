import { inject, Injectable } from '@angular/core';
import { GetHttpService } from './get-http.service';
import { take, tap } from 'rxjs';
import { UserResponce } from '../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { refreshStateAction, StoreActionsType } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class TeamNameService {
  private readonly getHttpService = inject(GetHttpService);
  private readonly store = inject(Store);
  private readonly storeUrl = 'https://parseapi.back4app.com/classes/booking';

  private teamName = '';

  setName(name: string): void {
    this.teamName = name;
    localStorage.setItem('teamName', name);
  }

  getName(): string {
    const localName = localStorage.getItem('teamName');
    if (!this.teamName && localName) {
      this.teamName = localName;
      this.store.dispatch({ type: StoreActionsType.loadBooks });
    }
    return this.teamName;
  }
}

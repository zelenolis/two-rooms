import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreActionsType } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class TeamNameService {
  private readonly store = inject(Store);

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

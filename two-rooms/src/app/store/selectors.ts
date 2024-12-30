import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookList } from '../interfaces/interfaces';

export const storeFeatureSelector = createFeatureSelector<BookList>('books');

export const selectBooksByTeam = (team: string = 'team0') =>
  createSelector(storeFeatureSelector, (state) =>
    state.items.filter((item) => item.team === team),
  );

export const selectByDate = (date: string) =>
  createSelector(storeFeatureSelector, (state) =>
    state.items.filter((val) => {
      const check = date.split('T')[0];
      const newVal = val.date.split('T')[0];
      return check === newVal;
    }),
  );

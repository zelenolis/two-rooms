import { createAction, props } from '@ngrx/store';
import { Booking } from '../interfaces/interfaces';

export enum StoreActionsType {
  loadBooks = '[LOAD] load books',
  addBook = '[ADD] add a booking',
  addAllBooks = '[ADD] add many bookings',
  refreshState = '[ADD] refresh all bookings',
  delBook = '[DEL] delete a booking',
}

export const addBookAction = createAction(
  StoreActionsType.addBook,
  props<{ newBook: Booking }>(),
);

export const addAllBooksAction = createAction(
  StoreActionsType.addAllBooks,
  props<{ newBooks: Booking[] }>(),
);

export const delBookAction = createAction(
  StoreActionsType.delBook,
  props<{ delId: string }>(),
);

export const refreshStateAction = createAction(
  StoreActionsType.refreshState,
  props<{ newBooks: Booking[] }>(),
);

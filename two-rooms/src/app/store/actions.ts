import { createAction, props } from '@ngrx/store'
import { Booking } from '../interfaces/interfaces'

export enum StoreActionsType {
  addBook = '[ADD] add a booking',
  addAllBooks = '[ADD] add many bookings',
  refreshState = '[ADD] refresh all bookings',
}

export const addBookAction = createAction(
  StoreActionsType.addBook,
  props<{ newBook: Booking }>(),
)

export const addAllBooksAction = createAction(
  StoreActionsType.addAllBooks,
  props<{ newBooks: Booking[] }>(),
)

export const refreshStateAction = createAction(
  StoreActionsType.refreshState,
  props<{ newBooks: Booking[] }>(),
)

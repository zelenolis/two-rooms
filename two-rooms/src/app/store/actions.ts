import { createAction, props } from "@ngrx/store";
import { Booking } from "../interfaces/interfaces";

export enum StoreActionsType {
    addBook = '[ADD] add a booking',
    addAllBooks = '[ADD] add many bookings',
}

export const addBookAction = createAction(
    StoreActionsType.addBook,
    props<{newBook: Booking}>()
)

export const addAllBooksAction = createAction(
    StoreActionsType.addAllBooks,
    props<{newBooks: Booking[]}>()
)
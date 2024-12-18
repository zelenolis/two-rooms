import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookList } from "../interfaces/interfaces";

export const storeFeatureSelector = createFeatureSelector<BookList>("books")

export const selectBooksByTeam = (team: string) => createSelector(
    storeFeatureSelector,
    (state) => state.items.find((book) => book.team === team)
)
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookList } from "../interfaces/interfaces";

export const storeFeatureSelector = createFeatureSelector<BookList>("books")

export const selectBooksByTeam = (team: string = 'team0') => createSelector(
    storeFeatureSelector,
    (state) => state.items.filter((item) => item.team === team)
)

export const selectByDate = (date: string) => createSelector(
    storeFeatureSelector,
    (state) => state.items.some(val => {
        return val.date == date
    })
)
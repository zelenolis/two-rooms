import { createReducer, on } from '@ngrx/store';
import { BookList } from '../interfaces/interfaces';
import * as actions from './actions';

export const STORE_REDUCER_NODE = 'books';

const initialState: BookList = {
  items: [],
};

export const bookReducer = createReducer(
  initialState,
  on(actions.addBookAction, (state: BookList, { newBook }) => ({
    ...state,
    items: [...state.items, newBook],
  })),
  on(actions.addAllBooksAction, (state: BookList, { newBooks }) => ({
    ...state,
    items: [...state.items, ...newBooks],
  })),
  on(actions.refreshStateAction, (state: BookList, { newBooks }) => ({
    ...state,
    items: [...newBooks],
  })),
  on(actions.delBookAction, (state: BookList, { delId }) => ({
    ...state,
    items: state.items.filter((item) => item.objectId !== delId),
  })),
);

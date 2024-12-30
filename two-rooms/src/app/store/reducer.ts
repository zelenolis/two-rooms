import { createReducer, on } from '@ngrx/store';
import { BookList } from '../interfaces/interfaces';
import {
  addBookAction,
  addAllBooksAction,
  refreshStateAction,
  delBookAction,
} from './actions';

export const STORE_REDUCER_NODE = 'books';

const initialState: BookList = {
  items: [],
};

export const bookReducer = createReducer(
  initialState,
  on(addBookAction, (state: BookList, { newBook }) => ({
    ...state,
    items: [...state.items, newBook],
  })),
  on(addAllBooksAction, (state: BookList, { newBooks }) => ({
    ...state,
    items: [...state.items, ...newBooks],
  })),
  on(refreshStateAction, (state: BookList, { newBooks }) => ({
    ...state,
    items: [...newBooks],
  })),
  on(delBookAction, (state: BookList, { delId }) => ({
    ...state,
    items: state.items.filter(item => item.objectId !== delId),
  })),
);

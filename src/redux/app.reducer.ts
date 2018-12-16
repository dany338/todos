import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { todoReducer } from './todos/todo.reducer';
export const AppReducer: ActionReducerMap<AppState> = {
  todos: todoReducer
};

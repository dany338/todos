import { createSelector } from '@ngrx/store';
import { AppState } from './../app.state';

export const selectTodos = (state: AppState) => state.todos;
export const selectFilter = (state: AppState) => state.filter;

export const getVisibleTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos, filter) => {
    if (filter === 'SHOW_ACTIVE') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'SHOW_DONE') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }
);

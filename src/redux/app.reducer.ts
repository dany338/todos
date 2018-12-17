import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { todosReducer } from './todos/todo.reducer';
import { filterReducer } from './filter/filter.reducer';
// Los reducers sean compatibles con los tipos de los estados de la aplicación
export const AppReducer: ActionReducerMap<AppState> = {
  todos: todosReducer,
  filter: filterReducer
};

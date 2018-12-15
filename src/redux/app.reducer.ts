import { AppState } from './app.state';
import { todoReducer } from './todos/todo.reducer';
import { Todo } from '../app/todos/shared/todo.model';
export const AppReducer = {
 todo: todoReducer
};

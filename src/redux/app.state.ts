import { Todo } from '../app/todos/shared/todo.model';
export interface AppState {
  todos: Todo[];
  filter: string;
}

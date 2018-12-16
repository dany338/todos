import { Action } from '@ngrx/store';
import { Todo } from '../../app/todos/shared/todo.model';
import {
  AllActions,
  ADDTODO,
  UPDATETODO,
  DELETETODO,
  FILTERTODO,
  CLEARCOMPLETEDTODO,
  COMPLETEDTODO,
  SELECTEDALLTODO,
  GETFROMJSONPLACEHOLDERTODO,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  SHOW_ALL,
  RESET
} from './todo.actions';
export function todoReducer(
  state: Array<Todo> = [],
  action: AllActions
): Array<Todo> {
  if (action === null) {
    return state;
  }
  switch (action.type) {
    case ADDTODO:
      const id = this.state.length + 1;
      const userId = Math.floor(Math.random() * 10) + 1;
      const completed = false;
      const todoItem = new Todo(
        userId,
        id,
        action.text,
        completed
      );
      state = [todoItem, ...state];
      return state;
    case COMPLETEDTODO:
      const index3 = state.findIndex(task => task.id === action.todo.id);
      state = [...state.slice(0, index3), action.todo, ...state.slice(index3 + 1)];
      return state;
    case UPDATETODO:
      const index = state.findIndex(task => task.id === action.todo.id);
      state = [...state.slice(0, index), action.todo, ...state.slice(index + 1)];
      return state;
    case DELETETODO:
      const index2 = state.findIndex(task => task.id === action.todo.id);
      state = [...state.slice(0, index2), ...state.slice(index2 + 1)];
      return state;
    case FILTERTODO:
        let todoListFilter = state;
        switch (action.filter) {
          case SHOW_COMPLETED:
            todoListFilter = todoListFilter.filter(todo => todo.completed === true);
          break;
          case SHOW_ACTIVE:
            todoListFilter = todoListFilter.filter(todo => todo.completed === false);
          break;
          case SHOW_ALL:
            todoListFilter = state;
          break;
        }
      return todoListFilter;
    case CLEARCOMPLETEDTODO:
      state = state.filter(todo => todo.completed === true);
      return state;
    case SELECTEDALLTODO:
      let completed2 = true;
      if (state.filter(todo => todo.completed === false).length === 0) {
        completed2 = false;
      }
      state = state.filter(todo => todo.completed !== completed2);
      for (let i = 0; i < state.length; i++) {
        const todoItem2 = state[i];
        todoItem2.completed = this.completed;
      }
      return state;
    case GETFROMJSONPLACEHOLDERTODO:
      return action.todos;
    case RESET:
      return Array<Todo>();
    default:
      return state;
  }
}

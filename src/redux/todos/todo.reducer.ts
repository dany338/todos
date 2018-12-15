import { Action } from '@ngrx/store';
import { Todo } from '../../app/todos/shared/todo.model';
import {
  AddAction,
  UpdateAction,
  FilterAction,
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
  SHOW_ALL
} from './todo.actions';
export function todoReducer(
  state: Array<Todo> = [],
  action: Action
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
        (<AddAction>action).text,
        completed
      );
      state = [todoItem, ...state];
      return state;
    case COMPLETEDTODO:
    case UPDATETODO:
      const index = state.findIndex(task => task.id === (<UpdateAction>action).todo.id);
      state = [...state.slice(0, index), (<UpdateAction>action).todo, ...state.slice(index + 1)];
      return state;
    case DELETETODO:
      const index2 = state.findIndex(task => task.id === (<UpdateAction>action).todo.id);
      state = [...state.slice(0, index2), ...state.slice(index2 + 1)];
      return state;
    case FILTERTODO:
        switch ((<FilterAction>action).filter) {
          case SHOW_COMPLETED:
            state = state.filter(todo => todo.completed === true);
          break;
          case SHOW_ACTIVE:
            state = state.filter(todo => todo.completed === false);
          break;
          case SHOW_ALL:
            state = state;
          break;
        }
      return state;
    case CLEARCOMPLETEDTODO:
      break;
    case SELECTEDALLTODO:
      break;
    case GETFROMJSONPLACEHOLDERTODO:
      break;

    default:
      return state;
  }
}

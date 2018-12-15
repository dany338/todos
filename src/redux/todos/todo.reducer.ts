import { Action } from '@ngrx/store';
import { Todo } from '../../app/todos/shared/todo.model';
export function todoReducer(state: Array<Todo> = [], action: Action): Array<Todo> {
  if (action === null) {
    return state;
  }
  switch (action.type) {
    case 'ADDTODO':

    break;
    case 'UPDATETODO':

    break;
    case 'DELETETODO':

    break;
    case 'FILTERTODO':

    break;
    case 'CLEARCOMPLETEDTODO':

    break;
    case 'SELECTEDTODO':

    break;
    case 'SELECTEDALLTODO':

    break;
    case 'GETFROMJSONPLACEHOLDERTODO':

    break;

    default:
      return state;
  }
}

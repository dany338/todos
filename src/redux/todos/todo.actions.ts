import { Action } from '@ngrx/store';
import { Todo } from '../../app/todos/shared/todo.model';
export const ADDTODO = '[Todos] add';
export const UPDATETODO = '[Todos] update';
export const DELETETODO = '[Todos] delete';
export const FILTERTODO = '[Todos] filter Active | Completed';
export const CLEARCOMPLETEDTODO = '[Todos] clear completed';
export const COMPLETEDTODO = '[Todos] completed';
export const SELECTEDALLTODO = '[Todos] selected all';
export const GETFROMJSONPLACEHOLDERTODO = '[Todos] get from json placeholder';
export const SHOW_COMPLETED = '[Todos] show filter completed';
export const SHOW_ACTIVE = '[Todos] show filteractive';
export const SHOW_ALL = '[Todos] show filter all';

export interface AddAction extends Action {
  text: string;
}

export interface UpdateAction extends Action {
  todo: Todo;
}

export interface FilterAction extends Action {
  filter: string;
}

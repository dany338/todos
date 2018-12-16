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
export const RESET = '[Todos] reset todos';

/*export interface AddAction extends Action {
  text: string;
}

export interface UpdateAction extends Action {
  todo: Todo;
}

export interface FilterAction extends Action {
  filter: string;
}*/

export class AddAction implements Action {
  readonly type = ADDTODO;

  constructor(
    public todo: Todo
  ) { }
}

export class UpdateAction implements Action {
  readonly type = UPDATETODO;

  constructor(
    public id: number,
    public newTitle: string
  ) { }
}

export class DeletedAction implements Action {
  readonly type = DELETETODO;

  constructor(
    public id: number
  ) { }
}

export class CompletedAction implements Action {
  readonly type = COMPLETEDTODO;

  constructor(
    public todo: Todo
  ) { }
}

export class FilterAction implements Action {
  readonly type = FILTERTODO;

  constructor(
    public filter: string
  ) { }
}

export class ResetAction implements Action {
  readonly type = RESET;
}

export class SelectedAllTodoAction implements Action {
  readonly type = SELECTEDALLTODO;
}

export class GetFromJsonPlaceholderTodoAction implements Action {
  readonly type = GETFROMJSONPLACEHOLDERTODO;

  constructor(
    public todos: Array<Todo>
  ) { }
}

export class ClearCompletedTodoAction implements Action {
  readonly type = CLEARCOMPLETEDTODO;
}

// tslint:disable-next-line:max-line-length
export type AllActions = AddAction | UpdateAction | DeletedAction | CompletedAction | FilterAction | ResetAction | SelectedAllTodoAction | GetFromJsonPlaceholderTodoAction | ClearCompletedTodoAction;

import { Action } from '@ngrx/store';

export const ADDTODO = '[Todos] add';
export const UPDATETODO = '[Todos] update';
export const DELETETODO = '[Todos] delete';
export const FILTERTODO = '[Todos] filter Active | Completed';
export const CLEARCOMPLETEDTODO = '[Todos] clear completed';
export const SELECTEDTODO = '[Todos] selected';
export const SELECTEDALLTODO = '[Todos] selected all';
export const GETFROMJSONPLACEHOLDERTODO = '[Todos] get from json placeholder';

export interface AddAction extends Action {
  payload: string;
}

export interface UpdateAction extends Action {
  payload: string;
}

export interface FilterAction extends Action {
  payload: boolean;
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { REQUEST_TODOS, AddTodosAction, RequestTodosAction } from './todo.actions';

import { mergeMap, map } from 'rxjs/operators';

import { TodoService } from './../../app/todos/shared/todo.service';

@Injectable()
export class TodoEffects {

  @Effect() requestTodos$: Observable<Action> = this.actions$.ofType(REQUEST_TODOS)
  .pipe( // mapear la respuesta
    mergeMap((action: RequestTodosAction) => {
      return this.todoService.getTodos(action.completed)
      .pipe(
        map((response: any) => {
          return new AddTodosAction(response.data.children.map((item: any) => {
            return item.data;
          }));
        })
      );
    })
  );

  constructor(
    private todoService: TodoService,
    private actions$: Actions
  ) {}
}

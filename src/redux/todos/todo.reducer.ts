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
export function todosReducer(
  oldState: Todo[] = [],
  action: AllActions
): Todo[] {
  if (action === null) {
    return oldState;
  }
  switch (action.type) {
    case ADDTODO: {
      // No mutar el estado actual - ECS6
      return [
        action.todo,
        ...oldState
      ];
    }
    case COMPLETEDTODO: {
      const index3 = oldState.findIndex(task => task.id === action.todo.id);
      return [
        ...oldState.slice(0, index3),
        action.todo,
        ...oldState.slice(index3 + 1)
      ];
    }
    case UPDATETODO: {
      return oldState.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            title: action.newTitle
          };
        } else {
          return todo;
        }
      });
    }
    case DELETETODO: {
      const index2 = oldState.findIndex(task => task.id === action.id);
      return [
        ...oldState.slice(0, index2),
        ...oldState.slice(index2 + 1)
      ];

      // return oldState.filter((todo) => {
      //  return todo.id !== action.id;
      // });
    }
    case FILTERTODO:
        let todoListFilter = oldState;
        switch (action.filter) {
          case SHOW_COMPLETED:
            todoListFilter = todoListFilter.filter(todo => todo.completed === true);
          break;
          case SHOW_ACTIVE:
            todoListFilter = todoListFilter.filter(todo => todo.completed === false);
          break;
          case SHOW_ALL:
            todoListFilter = oldState;
          break;
        }
      return todoListFilter;
    case CLEARCOMPLETEDTODO: {
      return oldState.filter(todo => todo.completed === true);
    }
    case SELECTEDALLTODO: {
      let completed2 = true;
      if (oldState.filter(todo => todo.completed === false).length === 0) {
        completed2 = false;
      }
      const todosSelectedAll = oldState.filter(todo => todo.completed !== completed2);
      for (let i = 0; i < todosSelectedAll.length; i++) {
        const todoItem2 = todosSelectedAll[i];
        todoItem2.completed = this.completed;
      }
      return todosSelectedAll;
    }
    case GETFROMJSONPLACEHOLDERTODO:
      return action.todos;
    case RESET:
      return Array<Todo>();
    default: {
      return oldState;
    }
  }
}

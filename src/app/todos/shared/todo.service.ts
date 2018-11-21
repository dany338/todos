import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todosList: Array<Todo> = [];
  constructor(private http: HttpClient) { }

  public getTodosFormJSONPlaceholder() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }

  public loadTodosToServer(todos: Array<Todo>) {
    return this.http.post('https://colorsandgloss.com/todosapi/api/web/v1/todos/loadtodos', {
      todos: todos
    });
  }

  public getTodos()  {
    return this.http.get('https://colorsandgloss.com/todosapi/api/web/v1/todos/search');
  }

  public addTodo(title: string) {

    const id = this.todosList.length + 1;
    const userId = Math.floor(Math.random() * 10) + 1;
    const completed = 0;

    return this.http.post('https://colorsandgloss.com/todosapi/api/web/v1/todos/create', {
      userId: userId,
      title: title,
      completed: completed
    });
  }

  public updateTodo(todo: Todo) {
    const todoId = todo.id;

    return this.http.put('https://colorsandgloss.com/todosapi/api/web/v1/todos/update', {
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    });
  }

  public updateTodos(todo: Todo) {

    return this.http.put('https://colorsandgloss.com/todosapi/api/web/v1/todos/state', {
      userId: todo.userId,
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    });
  }

  public updateCompletedTodos(todos: Array<Todo>, completed: boolean) {

    return this.http.post('https://colorsandgloss.com/todosapi/api/web/v1/todos/completed', {
      todos: todos,
      completed: completed
    });
  }

  public deleteTodo(todo: Todo) {
    const todoId = todo.id;

    return this.http.delete('https://colorsandgloss.com/todosapi/api/web/v1/todos/delete?id=' + todoId);
  }

  public clearCompleted(completed: boolean) {

    let valueCompleted = 0;
    if (completed === true) {
      valueCompleted = 1;
    }

    return this.http.get('https://colorsandgloss.com/todosapi/api/web/v1/todos/clear-completed?id=' + valueCompleted);
  }

  public completedTodos(completed: boolean): Array<Todo> {
    const todosList = this.todosList.filter(todo => todo.completed !== completed);
    console.log(todosList);
    for (let index = 0; index < todosList.length; index++) {
      const todo = todosList[index];
      todo.completed = completed;
      this.updatedLocally(todo);
    }
    return this.todosList;
  }

  public getFromLocal(): Array<Todo> {
    const items = localStorage.getItem('todosList');
    // tslint:disable-next-line:triple-equals
    if (items != null && items != undefined) {
      let todosList = JSON.parse(items);
      todosList = [...todosList];
      this.todosList = todosList;
    }
    return this.todosList;
  }

  public setToLocal(todos: Array<Todo>) {
    localStorage.setItem( 'todosList', JSON.stringify( todos ));
    this.todosList = todos;
  }

  public filterTodos(completed: boolean): Array<Todo> {
    const items = localStorage.getItem('todosList');
    if (items !== null && items !== undefined) {
      const todosItems = JSON.parse(items);
      this.todosList = todosItems;
    }
    this.todosList = this.todosList.filter(todo => todo.completed === completed);
    return this.todosList;
  }

  public saveLocally(todo: Todo) {
    let todosList = JSON.parse(localStorage.getItem('todosList'));
    todosList = [todo, ...todosList];
    localStorage.setItem( 'todosList', JSON.stringify( todosList ));
    this.todosList = todosList;
  }

  public updatedLocally(todo: Todo) {
    let todosList = JSON.parse(localStorage.getItem('todosList'));
    const index = todosList.findIndex(todoItem => todoItem.id === todo.id);
    todosList = [...todosList.slice(0, index), todo, ...todosList.slice(index + 1)];
    localStorage.setItem( 'todosList', JSON.stringify( todosList ));
    this.todosList = todosList;
  }

  public deleteLocally(todo: Todo) {
    let todosList = JSON.parse(localStorage.getItem('todosList'));
    const index = todosList.findIndex(todoItem => todoItem.id === todo.id);
    todosList = [...todosList.slice(0, index), ...todosList.slice(index + 1)];
    localStorage.setItem( 'todosList', JSON.stringify( todosList ));
    this.todosList = todosList;
  }
}

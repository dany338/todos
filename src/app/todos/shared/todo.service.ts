import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todosList: Array<Todo>;
  constructor(private http: HttpClient) { }

  public getTodos()  {
    return this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe((todos: Array<Todo>) => {
      this.getFromLocal(todos);
    });
  }

  public addTodo(title: string) {

    const id = this.todosList.length + 1;
    const userId = Math.floor(Math.random() * 10) + 1;
    const completed = false;

    const todo = new Todo(userId, id, title, completed);
    const newTodo = {userId: userId, title: title, completed: completed};

    return this.http.post('https://jsonplaceholder.typicode.com/todos', {newTodo})
    .subscribe((result) => {
      this.saveLocally(todo);
    }, (err) => {
      console.log(err);
    });
  }

  public updateTodo(todo: Todo) {
    const todoId = todo.id;
    const newTodo = JSON.stringify( todo );

    /*return this.http.put('https://jsonplaceholder.typicode.com/todos/' + todoId, {newTodo})
      .subscribe((result) => {
      console.log(result);*/
      this.updatedLocally(todo);
    /*}, (err) => {
      console.log(err);
    });*/
  }

  public deleteTodo(todo: Todo) {
    const todoId = todo.id;

    /* return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + todoId)
    .subscribe((result) => {
      console.log(result); */
      this.deleteLocally(todo);
    /*}, (err) => {
      //console.log(err);
    });*/
  }

  public getFromLocal(todos: Array<Todo>) {
    const items = localStorage.getItem('todosList');
    // tslint:disable-next-line:triple-equals
    if (items != null && items != undefined) {
      let todosList = JSON.parse(items);
      todosList = [...todosList];
      this.todosList = todosList;
    } else {
      localStorage.setItem( 'todosList', JSON.stringify( todos ));
      this.todosList = todos;
    }
  }

  public completedTodo(todo: Todo) {
    const todoList = this.todosList.find(todoItem => todoItem.id === todo.id);
    todoList.completed = todo.completed;
    this.updatedLocally(todoList);
  }

  public completedTodos(completed: boolean) {
    const todosList = this.todosList.filter(todo => todo.completed !== completed);

    for (let index = 0; index < todosList.length; index++) {
      const todo = todosList[index];
      todo.completed = completed;
      this.updatedLocally(todo);
    }
  }

  public filterTodos(completed: boolean) {
    const todosList = this.todosList.filter(todo => todo.completed === completed);
    this.todosList = todosList;
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

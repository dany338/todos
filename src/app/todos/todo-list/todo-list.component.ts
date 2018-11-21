import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TodoService } from '../shared/todo.service';
import { ToastrService } from 'ngx-toastr';
// Model
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  completed = false;
  edit = false;
  todosList: Array<Todo>;
  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    const path = this._route.routeConfig.path;

    if ( path === 'active' ) {
      this.initializeTodos(this.todoService.filterTodos(false));
    } else if ( path === 'completed' ) {
      this.initializeTodos(this.todoService.filterTodos(true));
    } else if ( path === '' ) {
      if (this.todoService.todosList.length > 0 ) {
        this.initializeTodos(this.todoService.getFromLocal());
      } else {
        // Con la api del listado de todos se cargaron los datos en la api propio que contiene una tabla todo con la estructura requerida
        this.todoService.getTodos().subscribe((todos: Array<Todo>) => {
          this.todoService.setToLocal(todos);
          this.initializeTodos(todos);
        });
      }
    }
  }

  onClear(message: string) {
    this.toastr.success('Clear Completed', message);
    this.todoService.clearCompleted(true).subscribe((todos: Array<Todo>) => {
      this.todoService.setToLocal(todos);
      this.initializeTodos(todos);
    }, (err) => {
      console.log(err);
    });
  }

  onGetTodos(message: string) {
    this.toastr.success('Get Todos', message);
    this.todoService.getTodosFormJSONPlaceholder().subscribe((todos: Array<Todo>) => {
      this.todoService.setToLocal(todos);
      this.initializeTodos(todos);
      this.todoService.loadTodosToServer(todos).subscribe((result: Array<Todo>) => {
        console.log(result);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  initializeTodos(todos: Array<Todo>) {
    this.todosList = todos;
  }

  selectAllTodos() {
    this.completed = !this.completed;
    this.todoService.updateCompletedTodos(this.todosList, this.completed).subscribe((result) => {
      console.log(result);
      this.initializeTodos(this.todoService.completedTodos(this.completed));
      this.toastr.success('Todo Completed', 'successfully completed todos');
    }, (err) => {
      console.log(err);
    });
  }

  selectedTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe((result) => {
      console.log(result);
      const todoItem = Todo.fromJson(result);
      this.todoService.completedTodo(todoItem);
      this.toastr.success('Todo Completed', 'successfully completed todo');
    }, (err) => {
      console.log(err);
    });
  }

  addTodo(task: any, $event: any) {
    $event.preventDefault();
    $event.stopPropagation();

    if (task.trim() !== '') {
      this.todoService.addTodo(task).subscribe((todo) => {
        const todoItem = Todo.fromJson(todo);
        this.todoService.saveLocally(todoItem);
        this.todosList = [todoItem, ...this.todosList];
        this.showSuccess();
      }, (err) => {
        console.log(err);
      });
    } else {
      this.showError();
    }
  }

  editTodo(todo: Todo, title: string, $event: any) {
    $event.preventDefault();
    $event.stopPropagation();

    if (title.trim() !== '') {
      todo.title = title;
      this.todoService.updateTodo(todo).subscribe((result) => {
        console.log(result);
        const todoItem = Todo.fromJson(result);
        this.todoService.updatedLocally(todoItem);
        const index = this.todosList.findIndex(task => task.id === todo.id);
        this.todosList = [...this.todosList.slice(0, index), todo, ...this.todosList.slice(index + 1)];
        this.toastr.success('Task Edited [' + title + ']', 'successfully edited task');
      }, (err) => {
        console.log(err);
      });
    } else {
      this.toastr.error('Task Not Edited', 'error edited task');
    }
  }

  deleteTodo(todo: Todo) {
    if (!todo.id) {
      this.toastr.error('Task Not Deleted', 'error deleted task');
    } else {
      this.todoService.deleteTodo(todo).subscribe((result) => {
        console.log(result);
        this.todoService.deleteLocally(todo);
        const index = this.todosList.findIndex(task => task.id === todo.id);
        this.todosList = [...this.todosList.slice(0, index), ...this.todosList.slice(index + 1)];
        this.toastr.success('Task Deleted [' + todo.id + ']', 'successfully deleted task');
      }, (err) => {
        console.log(err);
      });
    }
  }

  showSuccess() {
    this.toastr.success('Task Created', 'successfully created task');
  }

  showError() {
    this.toastr.error('Task Not Created', 'error created task');
  }

}

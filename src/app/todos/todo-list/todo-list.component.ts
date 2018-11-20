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
    console.log(path);

    if ( path === 'active' ) {
      this.todoService.filterTodos(false);
    } else if ( path === 'completed' ) {
      this.todoService.filterTodos(true);
    } else if ( path === '' ) {
      this.todoService.getTodos();
    }

    setTimeout(() => {
      this.initializeTodos();
    }, 900);
  }

  onClear(message: string) {
    this.toastr.success('Clear Completed', message);
    this.todoService.completedTodos(false);
    setTimeout(() => {
      this.initializeTodos();
    }, 900);
  }

  initializeTodos() {
    this.todosList = this.todoService.todosList;
  }

  selectAllTodos() {
    this.completed = !this.completed;
    this.todoService.completedTodos(this.completed);
    setTimeout(() => {
      this.initializeTodos();
    }, 900);
  }

  selectedTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.completedTodo(todo);
    setTimeout(() => {
      this.initializeTodos();
    }, 900);
  }

  addTodo(task: any, $event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('entro' + task);
    if (task.trim() !== '') {
      this.todoService.addTodo(task);
      this.showSuccess();
      setTimeout(() => {
        this.initializeTodos();
      }, 900);
    } else {
      this.showError();
    }
  }

  editTodo(todo: Todo, title: string, $event: any) {
    $event.preventDefault();
    $event.stopPropagation();

    if (title.trim() !== '') {
      todo.title = title;
      this.todoService.updateTodo(todo);
      this.toastr.success('Task Edited [' + title + ']', 'successfully edited task');
    } else {
      this.toastr.error('Task Not Edited', 'error edited task');
    }
  }

  deleteTodo(todo: Todo) {
    if (!todo.id) {
      this.toastr.error('Task Not Deleted', 'error deleted task');
    } else {
      this.toastr.success('Task Deleted [' + todo.id + ']', 'successfully deleted task');
      this.todoService.deleteTodo(todo);
      setTimeout(() => {
        this.initializeTodos();
      }, 900);
    }
  }

  showSuccess() {
    this.toastr.success('Task Created', 'successfully created task');
  }

  showError() {
    this.toastr.error('Task Not Created', 'error created task');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { TodoService } from '../shared/todo.service';
import { ToastrService } from 'ngx-toastr';
// Model
import { Todo } from '../shared/todo.model';
// ngrx
import { Store, Action } from '@ngrx/store';
import { AppState } from './../../../redux/app.state';
import {
  AddAction,
  UpdateAction,
  FilterAction,
  ResetAction,
  CompletedAction,
  DeletedAction,
  SelectedAllTodoAction,
  GetFromJsonPlaceholderTodoAction,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
  SHOW_ALL
} from './../../../redux/todos/todo.actions';
import { getVisibleTodos } from './../../../redux/todos/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  textField: FormControl; // Formularios reactivos para hacer facil el testeo, controlar el flujo de un formulario
  textEditField: FormControl;
  public itemLeft: String = '';
  completed = true;
  edit = false;
  todosList: Todo[];
  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    private _router: Router,
    private store: Store<AppState>) {
      this.textField = new FormControl('', [Validators.required]);
      this.readTodoState();
    }

  private readTodoState() {
    this.store.select('todos')
    .subscribe((todosState) => {
      this.todosList = todosState;
      console.log('todosState', todosState);
    });
  }

  // utilizando ngrx no es necesario el evento ngOnInit de angular
  ngOnInit() {

    const path = this._route.routeConfig.path;

    if ( path === 'active' ) {
      this.initializeTodos(this.todoService.filterTodos(false));

      const action = new FilterAction(SHOW_ACTIVE);

      this.store.dispatch(action);

    } else if ( path === 'completed' ) {
      this.initializeTodos(this.todoService.filterTodos(true));

      const action = new FilterAction(SHOW_COMPLETED);

      this.store.dispatch(action);

    } else if ( path === '' ) {
      if (this.todoService.todosList.length > 0 ) {
        this.initializeTodos(this.todoService.getFromLocal());
      } else {
        // Con la api del listado de todos se cargaron los datos en la api propio que contiene una tabla todo con la estructura requerida
        this.todoService.getTodos('SHOW_ALL').subscribe((todos: Array<Todo>) => {
          this.todoService.setToLocal(todos);
          this.initializeTodos(todos);
        });
      }

      const action = new FilterAction(SHOW_ALL);

      this.store.dispatch(action);
    }
  }

  onClear(message: string) {
    this.toastr.success('Clear Completed', message);
    this.todoService.clearCompleted(true).subscribe((todos: Array<Todo>) => {
      this.todoService.setToLocal(todos);
      // this.initializeTodos(todos);

    }, (err) => {
      console.log(err);
    });
  }

  onGetTodos(message: string) {
    this.toastr.success('Get Todos', message);
    this.todoService.getTodosFormJSONPlaceholder().subscribe((todos: Array<Todo>) => {

      const action = new ResetAction();

      this.store.dispatch(action);

      const action2 = new GetFromJsonPlaceholderTodoAction(todos);
      this.store.dispatch(action2);

      this.todoService.setToLocal(todos);
      // this.initializeTodos(todos);
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
    // Calculamos la cantidad de todos abiertos que aun no han sido completados
    this.itemLeft = this.todoService.filterTodos(false).length + ' item left';
  }

  selectAllTodos() {
    if (this.todoService.filterTodos(false).length === 0) {
      this.completed = false;
    }

    this.todoService.updateCompletedTodos(this.todosList, this.completed).subscribe((result) => {
      console.log(result);

      let todosList = this.todosList.filter(todo => todo.completed !== this.completed);
      for (let index = 0; index < todosList.length; index++) {
        const todoItem = todosList[index];
        todoItem.completed = this.completed;
        this.todoService.updatedLocally(todoItem);
        const indexOf = todosList.findIndex(task => task.id === todoItem.id);
        todosList = [...todosList.slice(0, indexOf), todoItem, ...todosList.slice(indexOf + 1)];
      }
      // this.initializeTodos(todosList);
      const action = new SelectedAllTodoAction();

      this.store.dispatch(action);

      this.toastr.success('Todo Completed', 'successfully completed todos');
    }, (err) => {
      console.log(err);
    });
  }

  selectedTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe((result) => {
      const todoItem = Todo.fromJson(result);
      this.todoService.updatedLocally(todoItem);
      // const index = this.todosList.findIndex(task => task.id === todo.id);
      // const todosList = [...this.todosList.slice(0, index), todo, ...this.todosList.slice(index + 1)];
      // this.initializeTodos(todosList);

      const action = new CompletedAction(todo);

      this.store.dispatch(action);

      this.toastr.success('Todo Completed', 'successfully completed todo');
    }, (err) => {
      console.log(err);
    });
  }

  addTodo(task: any, $event: any) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.textField.value.trim() !== '') {

      this.todoService.addTodo(this.textField.value).subscribe((todo) => {
        const todoItem = Todo.fromJson(todo);
        this.todoService.saveLocally(todoItem);
        // const todosList = [todoItem, ...this.todosList];
        // this.initializeTodos(todosList);

        const action = new AddAction(todoItem);

        this.store.dispatch(action);
        this.textField.setValue('');

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

    if (this.textField.value.trim() !== '') {
      todo.title = this.textField.value;

      this.todoService.updateTodo(todo).subscribe((result) => {
        console.log(result);
        const todoItem = Todo.fromJson(result);
        this.todoService.updatedLocally(todoItem);
        // const index = this.todosList.findIndex(task => task.id === todo.id);
        // this.todosList = [...this.todosList.slice(0, index), todo, ...this.todosList.slice(index + 1)];

        const action = new UpdateAction(todo.id, todo.title);

        this.store.dispatch(action);

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
        // const index = this.todosList.findIndex(task => task.id === todo.id);
        // this.todosList = [...this.todosList.slice(0, index), ...this.todosList.slice(index + 1)];

        const action = new DeletedAction(todo.id);

        this.store.dispatch(action);

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

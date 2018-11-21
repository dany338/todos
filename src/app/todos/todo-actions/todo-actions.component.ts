import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-actions',
  templateUrl: './todo-actions.component.html',
  styleUrls: ['./todo-actions.component.css']
})
export class TodoActionsComponent implements OnInit {

  itemLeft: String = '';
  @Output() clear: EventEmitter<string> = new EventEmitter<string>();

  @Output() getTodos: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  clearCompleted() {
    this.clear.emit('All cleaned satisfactorily');
  }

  getTodosJSONPlaceholder() {
    this.getTodos.emit('All todos get satisfactorily');
  }

}

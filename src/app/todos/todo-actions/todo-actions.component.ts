import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-actions',
  templateUrl: './todo-actions.component.html',
  styleUrls: ['./todo-actions.component.css']
})
export class TodoActionsComponent implements OnInit {

  @Input() public itemLeft: String;

  @Output() clear: EventEmitter<string> = new EventEmitter<string>();

  @Output() getTodos: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    console.log(this.itemLeft);
  }

  clearCompleted($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.clear.emit('All cleaned satisfactorily');
  }

  getTodosJSONPlaceholder($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.getTodos.emit('All todos get satisfactorily');
  }

}

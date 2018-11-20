import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Component
import { TodoListComponent } from './todos/todo-list/todo-list.component';

const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'active', component: TodoListComponent},
  {path: 'completed', component: TodoListComponent},
  {path: '**', component: TodoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// Import Component
import { TodoListComponent } from './todos/todo-list/todo-list.component';

const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'active', component: TodoListComponent},
  {path: 'completed', component: TodoListComponent},
  {path: '**', component: TodoListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

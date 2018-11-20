import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Component
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoActionsComponent } from './todos/todo-actions/todo-actions.component';

const appRoutes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'active', component: TodoListComponent},
  {path: 'completed', component: TodoListComponent},
  {path: '**', component: TodoListComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

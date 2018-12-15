import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material Module
import { MaterialModule } from './material';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoActionsComponent } from './todos/todo-actions/todo-actions.component';
// Http client service
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './../redux/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoActionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule adde
    MaterialModule,
    StoreModule.forRoot(AppReducer)
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

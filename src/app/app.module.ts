import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightDirective } from './directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './static/page-not-found/page-not-found.component';
import { ReversePipe } from './shared/reverse.pipe';
import { TabsComponent } from './tabs/tabs.component';
import { TodoEditorPageComponent } from './todo-editor-page/todo-editor-page.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { TodosService } from './todos/todos.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch:'full'},
  // { path: '', component: AppComponent},
  { path: 'todos', component: TodosPageComponent },
  { path: 'todos/:id', component: TodoEditorPageComponent },
  { path: 'todos/new', component: TodoEditorPageComponent },
  // { path: '**', redirectTo: 'todos' },// "**" alwayslast 
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ReversePipe,
    TodosPageComponent,
    TodoEditorPageComponent,
    PageNotFoundComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TodosService //singleton -> new TodosService()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

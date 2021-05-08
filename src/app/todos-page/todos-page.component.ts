import { Component, Input, OnInit, Output, Pipe } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Todo } from './../todos/todo.interface';
import { TodosService } from './../todos/todos.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit {
  constructor(
    private todosService: TodosService,
    private http: HttpClient
  ){}


  todoText: string = "Que désirez-vous accomplir aujourd'hui?";
  newTodoText: string = "";

  todos$: Observable<Todo[]>;
  todosFiltered: Todo[];
  todosTabIndex: number = 0;

  today: Date = new Date();
  userFormat="dd/MM/yyyy";
  completedCount=0;
  totalCount=0;

  // todos: {id:number, description: string, done: boolean} = [];
  fn: string = "";
  ngOnInit() {
    const obs$: Observable<Todo[]> = this.todosService.getTodos(); // retourne un Observable<Todo[]>

    this.todos$ = this.todosService.getTodos();
  }

  handleInputChange(event: any){
    console.debug(event);
    this.todoText = event.target.value
  }

  addItem(form: NgForm, event: Event) {
    event.preventDefault(); // prévient le rafraîchissement
    if (form.invalid) {
      return;
    }
    const todo : Todo = {
      id: null,
      description: form.value.newTodoText,
      // description: this.newTodoText,
      done: false
    };

    if(todo.description.length > 0){
      this.todosService
          .createTodo(todo)
          .subscribe(
            response => {
              this.todos$ = this.todosService.getTodos();
            },
            err => {}
          );
    }
  }

  onCheckboxToggle(todo: Todo, checkboxValue: boolean){
    todo.done = checkboxValue;
    this.completedCount += todo.done ? 1 : -1;
  }

  updateFirstName(text: string){
    this.fn = text;
    console.debug(text);
  }


  tabActivated(event: number){
  } 

}

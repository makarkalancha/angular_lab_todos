import { Component, Input, OnInit, Output, Pipe } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReversePipe } from './shared/reverse.pipe';
import { Router } from '@angular/router';
import { Todo } from './todos/todo.interface';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root', // .class, #id, [attribute] and in html <div class="app-root"></div>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // constructor(
  //     private todosService: TodosService,
  //     private http: HttpClient
  //   ){

  //   /*
  //   //don't do that
  //   const pipe = new ReversePipe();
  //   //str is of type "string|number|boolean|any[]" with v1
  //   //str is string with v2 overload
  //   const str = pipe.transform("");
  //   */
  // }

  // todoText: string = "Que désirez-vous accomplir aujourd'hui?";
  // newTodoText: string = "";
  // // todos: Todo[] = [
  // //   {index: 1, description: 'Acheter du lait', done: true},
  // //   {index: 1, description: 'Acheter du pain', done: false}
  // // ];
  // todos$: Observable<Todo[]>;
  // todosFiltered: Todo[];
  // todosTabIndex: number = 0;

  // today: Date = new Date();
  // userFormat="dd/MM/yyyy";
  // completedCount=0;
  // totalCount=0;

  // // todos: {id:number, description: string, done: boolean} = [];
  // fn: string = "";

  // // doSomething(event: Router){
  // //   // console.log(event.target);
  // //   // this.todoText = event.target.value;
  // //   if(event.target as HTMLInputElement){
  // //     const input = <HTMLInputElement> event.target;
  // //     console.log(input.value);
  // //     this.todoText = input.value;
  // //   }
  // // }

  // // doSomething(value: string){
  // //   this.todoText = value;
  // // }

  // ngOnInit() {
  //   // this.todosService.getTodos();
  //   // this.todosService
  //   //   .getTodos() // retourne un Observable<Todo[]>
  //   //   .subscribe((data: Todo[]) => console.log(data));
  //   // this.todosService
  //   //   .getTodos() // retourne un Observable<Todo[]>
  //   //   .subscribe((data: Todo[]) => console.log(data));
  //   // this.todosService
  //   //   .getTodos() // retourne un Observable<Todo[]>
  //   //   .subscribe(data => console.log(data));
  //   // this.todosService
  //   //   .getTodos() // retourne un Observable<Todo[]>
  //   //   .subscribe(data => this.todos = data);
  //   const obs$: Observable<Todo[]> = this.todosService.getTodos(); // retourne un Observable<Todo[]>
  //   //1. capture context this
  //   //2. one parameter - parathesis () are optional
  //   //3. has one instruction - curly braces / aucolade {} are optional
  //   //4. si {} not specidifed, return is optional
  //   //arrow function: data => this.todos = data
  //   // obs$.subscribe(data => {
  //     // this.todos = data;
            
  //     // this.completedCount = 0;
  //     // data.forEach(todo => this.completedCount += todo.done ? 1 : 0);
  //     // console.debug(this.completedCount);
  //   // }); 
  //   this.todos$ = this.todosService.getTodos();
    
  //   /*
  //   bug in javascript:
  //   if instead of lambda use function
  //   then "this" is pointing to function
  //   because when we call:
  //   const fn: Function = function(){}
  //   object "new Function()" is created

    
  //   const that = this;
  //   obs$.subscribe(function(todos){
  //     that.todos = todos;
  //   });

  //   another way to solve it
  //   obs$.subscribe(function(todos){
  //     this.todos = todos;
  //   }.bind(this));
  //   */

  //   /*
  //   const array = ['a', 'b', 'c'];
  //   const result = array.map((str, index) => {
  //     console.debug(arguments); //['a', 0,...]
  //     return str + index;
  //   });
  //   console.debug(result);
    
  //   //4.
  //   const result1 = array.map((str, index) => str + index);
  //   console.debug(result1);

  //   const result2 = array.map(s => {return {fn: s};} );
  //   const result3 = array.map(s => ({fn: s}));
  //   */
  // }

  // handleInputChange(event: any){
  //   console.debug(event);
  //   this.todoText = event.target.value
  // }

  // // addItem(text: string){
  //   // const todo = {index: this.todos.length+1, description: text, done: false};
  //   // console.debug(todo);
  //   // this.todos.push(todo);
  // // }
  // addItem(form: NgForm, event: Event) {
  //   event.preventDefault(); // prévient le rafraîchissement
  //   if (form.invalid) {
  //     return;
  //   }
  //   const todo : Todo = {
  //     id: null,
  //     description: form.value.newTodoText,
  //     // description: this.newTodoText,
  //     done: false
  //   };

  //   if(todo.description.length > 0){
  //     this.todosService
  //         .createTodo(todo)
  //         .subscribe(
  //           response => {
  //             this.todos$ = this.todosService.getTodos();
  //           },
  //           err => {}
  //         );
  //   }
  // }
  // // addItem(text: string) {
  // //   const todo : Todo = {
  // //     id: null,
  // //     description: text,
  // //     // description: this.newTodoText,
  // //     done: false
  // //   };
  // //   this.todosService
  // //       .createTodo(todo)
  // //       .subscribe(
  // //         response => {
  // //           this.todos$ = this.todosService.getTodos();
  // //         },
  // //         err => {}
  // //       );
  // // }


  // onCheckboxToggle(todo: Todo, checkboxValue: boolean){
  //   todo.done = checkboxValue;
  //   this.completedCount += todo.done ? 1 : -1;
  // }

  // updateFirstName(text: string){
  //   this.fn = text;
  //   console.debug(text);
  // }

  // // cssClasses(todo: Todo):string[]{
  // //   const classes = [];
  // //   if(todo.done){
  // //     console.debug("true done");
  // //     classes.push("done");
  // //   }else{
  // //     console.debug("false toto");
  // //     classes.push("toto");
  // //   }
  // //   return classes;
  // // }
  // tabActivated(event: number){
  //   // console.debug(`onglet #${event} a été sélectionné`);
  //   // this.todosTabIndex = event;
  //   // const done = this.todosTabIndex == 1;
  //   // this.todosFiltered = this.todos.filter(function(todo){
  //   //   return todo.done == done;
  //   // })
  // } 
 

}

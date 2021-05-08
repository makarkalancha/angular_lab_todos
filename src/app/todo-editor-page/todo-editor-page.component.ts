import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Todo } from './../todos/todo.interface';
import { TodosService } from './../todos/todos.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-todo-editor-page',
  templateUrl: './todo-editor-page.component.html',
  styleUrls: ['./todo-editor-page.component.css']
})
export class TodoEditorPageComponent implements OnInit, OnDestroy {
  id: number = 0;
  form: FormGroup;
  error: string="";

  subscriptions = new Subscription();//.add(subscription)
  
  //@input() is not binded, so no access to these variables
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private todosService: TodosService,
    ) {
    // new FormControl("", Validators Sync, Validators async);
    this.form = this.formBuilder.group({
      id: -1,
      // description: this.formBuilder.control('', Validators.required),
      // description: "description de la tache",
      description: ["description de la tache", [Validators.required, Validators.minLength(2)]],
      // done: this.formBuilder.control(false)
      done: false
    });

    this.subscriptions.add(
      this.form.get('description')
        .valueChanges
        .pipe(debounceTime(400))
        .subscribe(value => console.log("description: ", value))
    );
      

    this.subscriptions.add(
      this.form.valueChanges
      .pipe(debounceTime(400))
      .subscribe(value => console.log("form.valueChanges: ", value))
    );

    this.subscriptions.add(
      this.form.statusChanges
      .pipe(debounceTime(400))
      .subscribe(value => console.log("form.statusChanges: ", value))
    );

    
    //http://localhost:4200/todos/1?acs=column
    // this.route.queryParamMap ->acs=column
    //http://localhost:4200/todos/1
    this.subscriptions.add(this.route
      .paramMap //1
      .subscribe(paramsMap => {
        console.log(paramsMap.get('id'));
        const idString: string = paramsMap.get('id');
        const id: number = +paramsMap.get('id');
        this.id = id;
        console.log(id);

        this.subscriptions.add(this.todosService.fetchById(id)
          // .subscribe(todos =>{
          //   this.form.get('id').setValue(id);
          //   this.form.get('description').setValue(todo.description);
          //   this.form.get('done').setValue(todo.done);
            
          //   this.form.patchValue({
          //     description: todos[0].description,
          //     done: todos[0].done
          //   });
          // });

          // .subscribe(todo =>{
          //   this.form.get('id').setValue(id);
          //   this.form.get('description').setValue(todo.description);
          //   this.form.get('done').setValue(todo.done);
          // });

          // .subscribe(todo =>{
          //   this.form.setValue(todo);
          // });

          .subscribe(todo =>{
            this.form.patchValue(todo);
          })
        );
      })
    );
  }

  //@input() is binded
  ngOnInit(): void {
    
  }

  onSubmit(){

    if(this.form.invalid){
      this.error = "form is invalid";
      console.error(this.error);
      return;
    }
    // this.todosService.update({
    //     id: this.id,
    //     description: this.form.controls.description.value,
    //     done: this.form.controls.done.value
    //   })
    //   .subscribe(
    //     response => 
    //       this.router.navigateByUrl('/todos')
    //   );
    const dirty: Todo = this.form.value;
      this.subscriptions.add(this.todosService
      .update(dirty)
      .subscribe({
        //success
        next: saved => this.router.navigateByUrl('/todos'),
        //error
        error: err => {
          this.error = "update has an error";
          console.error(this.error, err);
          alert("alert");
        },
        //finally
        complete:() =>{
          //spinner
          console.log("complete")
        }
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); //release all child subscriptions
  }
}

import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root' // root injector -> AppModule
})
export class TodosService {

  constructor(private httpClient: HttpClient) {
    
  }

  getTodos(): Observable<Todo[]> {
    /*
    npmjs json-server in google to learn more
    done=false
    q=Ach
    */
    const obs$: Observable<Todo[]> = this.httpClient.get<Todo[]>('http://localhost:3000/todos'); //browser is multi Thread, but javascript is mono Thread
    return obs$; //$ is to mark Observable
  }

  // doesn't have id
  createTodo(todo: Todo): Observable<Todo> { 
    console.debug(todo);
    return this.httpClient.post<Todo>('http://localhost:3000/todos', todo);
  }

  // fetchById(number: string): Observable<Todo> { 
  //   const params = new HttpParams().append('id', number);
  //   const obs$: Observable<Todo> = this.httpClient.get<Todo>('http://localhost:3000/todos', {params})
  //     .pipe(
  //       tap(response => console.log(response)),
  //       // map(response => response.body),
  //     //   tap(response => console.log(response))
  //     )
  //     ;
  //   return obs$;
  // }

  fetchById(number: number): Observable<Todo> { 
    const obs$: Observable<Todo> = this.httpClient.get<Todo>(`http://localhost:3000/todos/${number}`)
      .pipe(
        tap(response => console.log(response)),
        // map(response => response.body),
      //   tap(response => console.log(response))
      )
      ;
    return obs$;
  }

  update(todo: Todo): Observable<Todo> { 
    const params = new HttpParams().append('id', todo.id.toString());
    // const body = '{'+JSON.stringify(todo)+'}';
    // const httpHeader = {
    //       headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }; 
    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { 
      // params: params
      // , headers: httpHeader 
    };
    return this.httpClient.put<Todo>(`http://localhost:3000/todos/${todo.id}`, todo, options)
      .pipe(
        tap(response => console.debug(response))
      );
    // return this.http.put<Todo>('http://localhost:3000/todos', body, {params});
    // return this.http.put<Todo>('http://localhost:3000/todos', body);
  }

  update1(todo: Todo): Observable<void> { 
    return this.httpClient.put<void>(`http://localhost:3000/todos/${todo.id}`, todo)
      .pipe(
        tap(response => console.debug(response))
      );
  }
  
  delete(todo: Todo) { 
    return this.httpClient.delete<void>(`http://localhost:3000/todos/${todo.id}`)
      .pipe(
        tap(response => console.debug(response))
      );
  }
}

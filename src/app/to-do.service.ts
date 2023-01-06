import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { envrironment } from './../environment/envrironment';
import { TodoModel } from './to-do-model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  apiURL: string = envrironment.apiURL;
  constructor(
    private http: HttpClient,
  ) {}
save(todoM: TodoModel) : Observable<TodoModel>{
  return this.http.post<TodoModel>(this.apiURL, todoM);
}
list(): Observable <TodoModel[]>{
      return this.http.get<TodoModel[]>(this.apiURL);
  }
deleteServ(id: number) : Observable<void> {
    const url: string = `${this.apiURL}/${id}`
  return this.http.delete<void>(url)
  }
markFinished(id: number): Observable<TodoModel>{
    const urlDone: string = `${this.apiURL}/${id}/done`
    return this.http.patch<TodoModel>(urlDone, {})
  }
}

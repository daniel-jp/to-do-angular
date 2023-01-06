import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoModel } from './to-do-model';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements  OnInit {
todos:TodoModel[]=[];
  form: FormGroup = new FormGroup({
  description : new FormControl('',[Validators.required, Validators.minLength(4)])
  })

constructor(
  private service: ToDoService
  ){}

  ngOnInit() {
    this.listTodos();
  }

  listTodos(){
     this.service.list().subscribe(todoList => {
      console.log(todoList)
      this.todos = todoList
    });
  }

submit(){
  console.log(this.form.value)

  const todo: TodoModel = {...this.form.value}
  this.service
      .save(todo)
      .subscribe(savedTodo => {
      this.todos.push(savedTodo)
      this.form.reset()
      })
    }

    delete(todo: TodoModel){
      this.service.deleteServ(todo.id).subscribe({
        next:(response)=>this.listTodos()
      })
    }
    done(todo: TodoModel){
      this.service.markFinished(todo.id).subscribe({
        next: (toDoFinished) => {
          todo.done = toDoFinished.done
          todo.doneDate = toDoFinished.doneDate
          }
      })
    }


}

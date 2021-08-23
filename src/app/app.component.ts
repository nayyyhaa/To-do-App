import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: string ="";
  todos: string[] = [];

  addTodo(todo: string) {
    this.todos.push(todo);
    console.log(this.todos)
  }
   
}

import { Component } from '@angular/core';
import { TODO } from 'src/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoTitle: string ="";
  todos: TODO[] = [];
  masterTodos: TODO[] = this.todos;
  id = 0;

  addTodo(todoTitle: string) {
    let todo = {name: todoTitle, id:this.id, isCompleted: false}
    this.todos.push(todo);
    this.assignMasterTodo(this.todos);
    this.todoTitle = "";
    this.id++;
  }

  deleteTodo(stodo: TODO) {
    this.todos = this.todos.filter(todo => todo.id !== stodo.id)
    this.assignMasterTodo(this.todos);
  }

  assignMasterTodo(todos: TODO[]) {
    this.masterTodos = [...todos];
  }

  filterTodos(filterType: string) {
    console.log(filterType)
    if(filterType === 'completed')
      this.todos = this.todos.filter(todo => todo.isCompleted === true);
    else if(filterType === 'uncompleted')
      this.todos = this.todos.filter(todo => todo.isCompleted !== false);
    else this.todos = this.masterTodos;
  }
   
}

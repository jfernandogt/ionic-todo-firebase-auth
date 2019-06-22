import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public newTodoText: string;
  public todos: Array<any>;

  constructor(
    private todoService: TodoService
  ) {
    this.newTodoText = '';
  }

  async ngOnInit() {
    this.todos = await this.todoService.getTodos();
    console.log('todos', this.todos);
  }

  async addTodo() {
    this.todos = await this.todoService.addTodo(this.newTodoText);
    this.newTodoText = '';
  }

}

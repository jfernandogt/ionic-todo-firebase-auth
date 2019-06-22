import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public newTodoText: string;
  public todos: Array<Todo>;

  constructor(
    private todoService: TodoService
  ) {
    this.newTodoText = '';
  }

  async ngOnInit() {
    this.todos = await this.todoService.getTodos();
  }

  async addTodo() {
    this.todos = await this.todoService.addTodo(this.newTodoText);
    this.newTodoText = '';
  }

  toggleCompletion(todo: Todo) {
    this.todos = this.todoService.toggleCompletion(todo);
  }

  remove(todo: Todo) {
    this.todos = this.todoService.remove(todo);
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  cancelEditing(todo: Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
    todo.editing = false;
    todo.title = editedTitle;
    this.todoService.updateTodo(todo);
  }
  
  getRemaining() {
		return this.todoService.getRemaining();
  }

  getCompleted() {
		return this.todoService.getCompleted();
  }
  
  removeCompleted() {
		this.todos = this.todoService.removeCompleted();
	}

}

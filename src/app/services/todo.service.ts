import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class Todo {
  completed: boolean;
  editing: boolean;

  private _title: string;
  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value.trim();
  }

  constructor(title: string) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: Array<Todo>
  constructor(
    private storage: Storage
  ) {
  }

  async getTodos() {
    const todosStored = await this.storage.get('todos');
    const todos = JSON.parse(todosStored) || [];
    this.todos = todos.map( (todo: {_title: string, completed: boolean}) => {
			const ret = new Todo(todo._title);
			ret.completed = todo.completed;
			return ret;
    });
    return this.todos;
  }

  private updateStore() {
    this.storage.set('todos', JSON.stringify(this.todos));
  }

  addTodo(title: string) {
    this.todos.push(new Todo(title));
    this.updateStore();

    return this.todos;
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
    return this.todos;
  }

  remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
    return this.todos;
  }
  
  updateTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos[index] = todo;
    }
    this.updateStore();
  }

  getCompleted() {
		return this.getWithCompleted(true);
  }

  getRemaining() {
		return this.getWithCompleted(false);
  }

  private getWithCompleted(completed: boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

  removeCompleted() {
		this.todos = this.getWithCompleted(false);
    this.updateStore();
    return this.todos;
	}
}

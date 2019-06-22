import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export class Todo {
	completed: Boolean;
	editing: Boolean;

	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}

	constructor(title: String) {
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
    this.todos = todos.map( (todo: {_title: String, completed: Boolean}) => {
			let ret = new Todo(todo._title);
			ret.completed = todo.completed;
			return ret;
    });
    return this.todos;
  }

  private updateStore() {
    this.storage.set('todos', JSON.stringify(this.todos));
  }
  
  remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
		this.updateStore();
	}

  addTodo(title: String) {
    this.todos.push(new Todo(title));
    this.updateStore();

    return this.todos;
  }
}

import { TodoService } from './../../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { Observable, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string;
  checked: any;

  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data) => {
      console.log(data);
      this.todos = data;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.todoService.addTodo({ name } as Todo).subscribe((todo: Todo) => {
      this.todos.push(todo);
    });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter((v) => v !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  edit(todo: Todo) {
    let title = todo.name;
    let result = prompt('Edit Todo', title);
    if (result !== null) {
      todo.name = result;
    }
    this.todoService.updateTodo(todo).subscribe();
  }
}

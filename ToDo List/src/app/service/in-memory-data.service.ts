import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { name: 'Grocery', id: 1, isCompleted: true },
      { name: 'Planting', id: 2, isCompleted: false },
      { name: 'Swimming', id: 3, isCompleted: false },
      { name: 'Cleaning', id: 4, isCompleted: true },
      { name: 'Work', id: 5, isCompleted: true },
      { name: 'Shower', id: 6, isCompleted: false },
    ];
    return { todos };
  }

  // Overrides the genId method to ensure that a todo always has an id.
  // If the todos array is empty,
  // the method below returns the initial number (11).
  // if the todos array is not empty, the method below returns the highest
  // todo id + 1.
  genId(todos: Todo[] = []): number {
    return todos.length > 0 ? Math.max(...todos.map((Todo) => Todo.id)) + 1 : 11;
  }
}

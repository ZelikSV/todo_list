export default class Store<T = unknown> {
  name: string;

  todos: T[];

  constructor(name: string, todos: T[]) {
    this.name = name;
    this.todos = todos;
  }

  get getTodos(): T[] {
    return (localStorage.getItem(this.name) ? JSON.parse(localStorage.getItem(this.name) as string) : []) as T[];
  }

  setTodos = (todos: T[]): void => {
    localStorage.setItem(this.name, JSON.stringify(todos));
  };
}

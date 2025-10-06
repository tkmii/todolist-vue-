import { defineStore } from 'pinia';
import { type Todo } from '@/types/index';

export const useTodolistStore = defineStore('todolist', {
  state: () => ({
    todos: [] as Todo[],
    nextId: 0 as number,
  }),

  getters: {
    getTodoById: (state) => {
      return (id: number) => {
      const todo = state.todos.find(todo => todo.id === id);
      if (!todo) throw new Error(`Todo with id ${id} not found`);
      return todo;
    }
    }
  },

  actions: {
    addTodo(text: string) {
      this.todos.push({
        id: this.nextId++,
        text: text.trim(),
        completed: false
      })
      this.saveToLocalStorage()
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveToLocalStorage()
    },
    toggleTodo(id: number) {
      const todo = this.getTodoById(id);
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    },
    updateTodo(id: number, newText: string) {
      const todo = this.getTodoById(id);
      todo.text = newText.trim();
      this.saveToLocalStorage()
    },
    reorderTodos(newOrder: Todo[]) {
      this.todos = newOrder;
      this.saveToLocalStorage()
    },
    loadFromLocalStorage() {
      const localStorageData = localStorage.getItem('todos');
      if (localStorageData) {
        const parsedTodos = JSON.parse(localStorageData);
        this.todos = parsedTodos;
        
        if (parsedTodos.length > 0) {
          this.nextId = Math.max(...parsedTodos.map((todo: Todo) => todo.id)) + 1;
        }
      } else {
        return this.todos;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    initializeStore() {
      this.loadFromLocalStorage();
    }
  },
})
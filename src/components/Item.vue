<script setup lang="ts">
import { useTodolistStore } from '@/store/store';
import { computed } from 'vue';
import { type Props } from '@/types/index';
import Icon from './Icon.vue';

const props = defineProps<Props>();
const todosStore = useTodolistStore();

const todo = computed(() => todosStore.getTodoById(props.todoId));

function handleBlur(e: FocusEvent) {
  const target = e.target as HTMLElement;
  const newText = target.innerText.trim();
  
  if (newText === '') {
    alert('Текст задачи не должен быть пустым');
    target.innerText = todo.value!.text;
    target.focus();
    return;
  }

  todosStore.updateTodo(props.todoId, newText);
}

// Возможно, надо сделать ещё для клавиши esc, но пока так оставила
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    (e.target as HTMLElement).blur();
  }
}

</script>

<template>
  <li 
    class="todoitem"
    :class="{ 'completed': todo.completed }"
  >
    <button class="button__icon drag-handle">
      <Icon 
        :width="15"
        :height="15"
        name="dnd"
        viewBox="0 0 24 24"
      />
    </button>
    
    <input 
      type="checkbox" 
      :checked="todo.completed"
      @change="todosStore.toggleTodo(props.todoId);"
      class="todoitem__input"
    />
    <div 
      contenteditable="true"
      class="todoitem__text"
      :textContent="todo.text" 
      @blur="handleBlur"
      @keydown="handleKeydown"
    >
      {{ todo.text }}
    </div>
    <button 
      @click="todosStore.removeTodo(props.todoId)"
      class="button__icon"
    >
      <Icon 
        :width="15"
        :height="15"
        viewBox="0 0 512 512"
        name="delete"
      />
    </button>
  </li>
</template>

<style scoped>
  .todoitem {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
    width: fit-content;
    max-width: 100%;
  }
  .todoitem__text {
    max-width: 100%;
    overflow-wrap: break-word;
    overflow: hidden;
    padding: 10px;
    cursor: pointer;
  }
  .todoitem.completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .todoitem .button__icon {
    opacity: 0;
    transition: opacity 0.5s ease;
    flex-shrink: 0;
  }
  .todoitem:hover .button__icon {
    opacity: 1;
  }
  .todoitem__text:focus-visible {
    outline: 1px solid #bfbfbf;
    border-radius: 4px;
  }
  .todoitem__input {
    flex-shrink: 0;
  }
  @media (max-width: 767px) {
    .todoitem {
      gap: 7px;
    }
    .todoitem .button__icon {
      opacity: 1;
    }
    .todoitem__text {
      padding: 7px;
    }
  }
</style>

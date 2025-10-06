<script setup lang="ts">
import { useTodolistStore } from '@/store/store';
import { computed } from 'vue';
import Draggable from "vuedraggable";
import Item from '@/components/Item.vue';

const todosStore = useTodolistStore();

const todos = computed({
  get: () => todosStore.todos,
  set: (value) => {
    todosStore.reorderTodos(value);
  }
});
</script>

<template>
    <Draggable 
      v-model="todos"
      item-key="id"
      tag="ul"
      v-if="todos.length > 0"
      class="todolist"
      handle=".drag-handle"
    >
      <template 
        #item="{ element: todo }"
      >
        <Item 
          :todoId="todo.id" 
          :key="todo.id"
        />
      </template>
    </Draggable>
  <p class="todolist__text" v-else>Список задач пуст</p>
</template>

<style scoped>
  .todolist__text {
    width: calc(100% - 50px);
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    .todolist__text {
      width: 100%;
    }
  }
</style>
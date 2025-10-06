<script setup lang="ts">
import { ref } from 'vue';
import { useTodolistStore } from '@/store/store';

const text = ref('');
const todosStore = useTodolistStore();

function handleSubmit() {
  const trimmedText = text.value.trim();
  // Без валидации, т.к. у нас уже есть :disabled="!text.trim()"
  todosStore.addTodo(trimmedText);
  text.value = '';
}
</script>

<template>
  <form 
    class="form" 
    @submit.prevent="handleSubmit"
  >
    <input 
      type="text" 
      v-model="text" 
      placeholder="Введите текст задачи" 
      class="form__input"
    />
    <button 
      class="button__text" 
      type="submit"
      :disabled="!text.trim()"
    >
      Добавить
    </button>
  </form>
</template>

<style scoped>
  .form {
    display: flex;
    gap: 15px;
    width: calc(100% - 50px);
    margin: 0 auto;
    margin-bottom: 15px;
  }
  .form__input {
    width: 100%;
  }
  @media (max-width: 767px) {
    .form {
      width: 100%;
      gap: 10px;
    }
  }
</style>

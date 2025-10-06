<script setup lang="ts">
import { onMounted } from 'vue';
import { useTodolistStore } from '@/store/store';
import Title from '@/components/Title.vue';
import Form from '@/components/Form.vue';
import List from '@/components/List.vue';
import SvgSprite from './components/SvgSprite.vue';

const store = useTodolistStore()
onMounted(() => store.initializeStore())
</script>

<template>
    <main>
      <section class="section">
        <Title></Title>
        <Form></Form>
        <List></List> 
      </section>
    </main>
    <SvgSprite />
</template>

<style scoped>
</style>

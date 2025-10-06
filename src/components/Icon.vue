<script setup>
import { defineProps } from 'vue';

defineProps({
  name: {
    type: String,
    required: true
  },
  viewBox: {
    type: String,
    required: true
  }
})
</script>

<template>
  <svg :viewBox="viewBox">
    <use :href="`#${name}-icon`"></use>
  </svg>
</template>
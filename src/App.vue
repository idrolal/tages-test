<template>
  <KeepAlive>
    <component :is="layoutComponent"></component>
  </KeepAlive>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import layout from '@/layouts/index.vue';

const layoutComponent = computed(() => {
  return layout;
});
</script>

<style scoped></style>

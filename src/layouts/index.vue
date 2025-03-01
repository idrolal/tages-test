<template>
  <link rel="stylesheet" :href="`/themes/theme.${theme}.css`" />

  <div class="layout">
    <BreadCrumbs />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/globalStore';
import { storeToRefs } from 'pinia';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const globalStore = useGlobalStore();
const { theme } = storeToRefs(globalStore);
</script>

<style lang="scss" scoped>
.layout {
  background-color: var(--main-bg-color);
  padding: 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 768px) {
  .layout {
    padding: 32px 64px;
  }
}
@media (min-width: 1280px) {
  .layout {
    padding: 32px 216px;
  }
}
@media (min-width: 1920px) {
}
</style>

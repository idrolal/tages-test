<template>
  <svg
    :width="props.size ? props.size[0] : null"
    :height="props.size ? props.size[1] : null"
    :fill="props.color ? props.color : null"
  >
    <title v-if="props.title">{{ props.title }}</title>
    <use :href="url"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: string;
  size?: string[] | number[];
  color?: string;
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: () => ['1em', '1em'],
});

const url = computed(() => `/images/svg/sprites.svg#${props.icon}`);
</script>

<style lang="scss" scoped>
</style>

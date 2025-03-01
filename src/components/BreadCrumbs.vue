<template>
  <ul class="breadcrumbs">
    <li
      v-for="item in breadcrumbs"
      :key="item.to.name"
      class="breadcrumbs__item"
    >
      <RouterLink
        :to="item.to"
        :class="`breadcrumbs__link ${
          item.to.name === route.name && 'breadcrumbs__link-active'
        }`"
        >{{ item.label }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { InterfaceMeta } from '@/router/categories';

const route = useRoute();

const breadcrumbs = computed(() => {
  const { meta } = route;
  return (meta as InterfaceMeta).breadcrumb?.map((item) => {
    const router = {
      label: item.label,
      to: { name: item.name, params: {} },
    };

    if (typeof item.params === 'function') {
      router.to.params = item.params(route);
    }

    if (typeof item.label === 'function') {
      router.label = item.label(route);
    }
    return router;
  });
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;

  .breadcrumbs__item {
    font-weight: 400;
    font-size: 16px;

    &:not(:last-child) {
      &::after {
        content: '/';
        margin-left: 8px;
      }
    }
  }

  .breadcrumbs__link {
    color: var(--breadcrumbs-text-color);

    &.breadcrumbs__link-active {
      color: var(--breadcrumbs-text-color-active);
      pointer-events: none;
    }
  }
}
</style>

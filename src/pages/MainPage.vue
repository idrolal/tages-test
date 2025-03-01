<template>
  <section class="categories">
    <CardItem
      v-for="category in categories"
      :key="category.name"
      class="categories__item"
    >
      <RouterLink
        :to="{ name: RouterName.CATEGORIES_PAGE, params: category.params }"
        >{{ category.name }}
      </RouterLink>
    </CardItem>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterName } from '@/router/routesName';
import CardItem from '@/components/CardItem.vue';

const categories = ref([
  {
    name: 'Системы хранения',
    params: {
      category: 'storage_systems',
    },
  },
]);

</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
</style>

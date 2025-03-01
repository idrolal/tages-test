<template>
  <section class="categories-page">
    <h1>Системы хранения</h1>
    <div class="categories">
      <RouterLink
        v-for="category in categories"
        :to="{ name: RouterName.CATEGORY_PAGE, params: category.params }"
        :key="category.name"
      >
        <CardItem class="categories__item">
          {{ category.name }}
        </CardItem>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterName } from '@/router/routesName';
import CardItem from '@/components/CardItem.vue';

const categories = ref([
  {
    name: 'Комплекты стеллажных систем',
    params: {
      name: 'shelving_system_kits',
    },
  },
]);
</script>

<style lang="scss" scoped>
.categories-page {
  display: flex;
  gap: 32px;
  flex-direction: column;

  h1 {
    font-size: 36px;
    line-height: 1.2;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }
}
</style>

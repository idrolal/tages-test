<template>
  <section class="category-page">
    <!-- тут бы тоже маппинг использовать или локализвацию -->
    <h1>{{ route.params.name }}</h1>
    <div class="category-page_filters">
      <CustomSelect
        :items="sortingPrice"
        label="Сортировать по"
        optionsKey="value"
        optionsLabel="label"
        placeholder="Выберите сортировку"
        v-model="data.sort"
      />

      <CustomSelect
        :items="materials"
        label="Материал"
        optionsKey="id"
        optionsLabel="name"
        placeholder="Выберите материал"
        v-model="data.material"
      />
    </div>

    <CategoryCard
      :categoryItems="categories"
      :loading="data.loading"
      :name="route.params.name"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import CategoryCard from '@/components/CategoryCard.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import { useCategoriesStore } from '@/store/categoriesStore';

const sortingPrice = [
  {
    value: 'asc',
    label: 'Цена по возрастанию',
  },
  {
    value: 'desc',
    label: 'Цена по убыванию',
  },
];

interface Data {
  loading: boolean;
  sort: 'asc' | 'desc' | null;
  material: string | null;
}

const route = useRoute();
const categoriesList = useCategoriesStore();

const { getCategoryItems, getMaterials } = categoriesList;
const { categoryItems, materials } = storeToRefs(categoriesList);

const data = reactive<Data>({
  loading: true,
  sort: null,
  material: null,
});

const categories = computed(() => {
  return categoryItems.value
    .filter((item) => {
      if (data.material) {
        return item.material === +data.material;
      }
      return true;
    })
    .sort((a, b) => {
      if (data.sort === 'asc') {
        return a.price.current_price - b.price.current_price;
      }

      if (data.sort === 'desc') {
        return b.price.current_price - a.price.current_price;
      }
    });
});

onMounted(async () => {
  await getMaterials();
  await getCategoryItems(route.params.name);
  data.loading = false;
});
</script>

<style lang="scss" scoped>
.category-page {
  display: inline-flex;
  flex-direction: column;
  gap: 32px;

  h1 {
    font-size: 36px;
    line-height: 1.2;
  }

  .category-page_filters {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;

    & > div {
      width: 100%;
    }
  }
}

@media (min-width: 620px) {
  .category-page {
    .category-page_filters {
      & > div {
        width: 280px;
      }
    }
  }
}
</style>

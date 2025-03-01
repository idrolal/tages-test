<template>
  <div
    class="category-card__content"
    v-if="!props.loading && props.categoryItems.length"
  >
    <CardItem
      v-for="item in props.categoryItems"
      :key="item.id"
      class="category-card__item"
    >
      <div class="category-card__item-header">
        <span v-if="item.price.old_price" class="category-card__item-sale"
          >Скидка</span
        >
        <img
          :src="item.image.url"
          width="238px"
          height="238px"
          :alt="item.name"
        />
      </div>

      <div class="category-card__item-footer">
        <div class="category-card__item-info">
          <span v-if="item.code" class="category-card__item-code">{{
            item.code
          }}</span>
          <p class="category-card__item-name">{{ item.name }}</p>
          <div class="category-card__item-prices">
            <p
              class="category-card__item-price category-card__item-price--old"
              v-if="item.price.old_price"
            >
              {{ item.price.old_price.toFixed(0) }}₽
            </p>
            <p class="category-card__item-price">
              {{ item.price.current_price.toFixed(0) }}₽
            </p>
          </div>
        </div>

        <div class="category-card__item-actions">
          <Icon
            :icon="data.cart[item.id] ? 'ok' : 'cart'"
            :size="['20px', '20px']"
            :class="{
              'category-card__action': true,
              'category-card__action-in-cart': data.cart[item.id],
            }"
            @click="setCart(item.id)"
          />
          <Icon
            icon="heart"
            :size="['20px', '20px']"
            :class="{
              'category-card__action': true,
              'category-card__action-favorite': data.favorites[item.id],
            }"
            @click="setFavorites(item.id)"
          />
        </div>
      </div>
    </CardItem>
  </div>

  <div v-else>loading</div>
</template>

<script setup lang="ts">
import type { CategoryItem } from '@/store/categoriesStore/types';
import CardItem from '@/components/CardItem.vue';
import Icon from '@/components/Icon.vue';
import { reactive, onBeforeMount } from 'vue';

interface Props {
  categoryItems: CategoryItem[];
  loading: boolean;
  name: string;
}

interface Data {
  favorites: Record<CategoryItem['id'], boolean>;
  cart: Record<CategoryItem['id'], boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  categoryItems: () => [],
  loading: true,
});

const data = reactive<Data>({
  favorites: {},
  cart: {},
});

const setFavorites = (id: CategoryItem['id']) => {
  data.favorites[id] = !data.favorites[id];
  localStorage.setItem(
    `${props.name}-favorites`,
    JSON.stringify(data.favorites)
  );
};

const setCart = (id: CategoryItem['id']) => {
  data.cart[id] = !data.cart[id];
  localStorage.setItem(`${props.name}-cart`, JSON.stringify(data.cart));
};

onBeforeMount(() => {
  data.favorites = JSON.parse(
    localStorage.getItem(`${props.name}-favorites`) || `{}`
  );
  data.cart = JSON.parse(localStorage.getItem(`${props.name}-cart`) || `{}`);
});
</script>

<style lang="scss" scoped>
.category-card__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 48px;
  column-gap: 40px;

  .category-card__item {
    padding: 10px 12px;
    min-width: 300px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    justify-content: space-between;
    flex: 1;

    .category-card__item-header {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .category-card__item-sale {
        position: absolute;
        left: -12px;
        top: 8px;
        background-color: var(--sale-bg-color);
        color: var(--sale-text-color);
        font-size: 14px;
        line-height: 1.2;
        padding: 3px 16px;
      }
    }

    .category-card__item-footer {
      display: flex;
      justify-content: space-between;

      .category-card__item-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: var(--main-text-color);
        font-size: 16px;
        font-weight: 400;
        gap: 6px;

        .category-card__item-code {
          font-size: 10px;
          color: var(--light-text-color);
        }

        .category-card__item-name {
          font-weight: 500;
        }
        .category-card__item-prices {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;

          .category-card__item-price {
            &--old {
              text-decoration: line-through;
              color: var(--light-text-color);
            }
          }
        }
      }

      .category-card__item-actions {
        display: flex;
        justify-content: end;
        align-items: flex-end;
        color: var(--main-text-color);
        gap: 10px;
        margin-right: 2px;

        .category-card__action {
          cursor: pointer;
          transition: all 0.3s;

          &-in-cart {
            fill: var(--icon-in-cart-color);
          }
          &-favorite {
            fill: var(--icon-favorite-color);
          }
        }
      }
    }
  }
}
</style>

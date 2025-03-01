import { defineStore } from 'pinia';
import type { CategoriesStoreScheme, CategoryItem, Material } from './types';
import { AxiosError } from 'axios';

export const useCategoriesStore = defineStore('categoriesStore', {
  state: (): CategoriesStoreScheme => ({
    categoryItems: [],
    materials: [],
    errorCategoryItems: undefined,
    errorMaterials: undefined,
  }),
  actions: {
    async getCategoryItems(name: string) {
      try {
        const { data } = await this.$api.get<CategoryItem[]>(
          `/data/${name}.json`
        );

        this.categoryItems = data;
        this.errorCategoryItems = undefined;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errorCategoryItems = error.response?.data.message;
        }
      }
    },
    async getMaterials() {
      if (this.materials.length) {
        return;
      }
      try {
        const { data } = await this.$api.get<Material[]>(
          `/data/materials.json`
        );
        this.materials = data;
        this.errorMaterials = undefined;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errorMaterials = error.response?.data.message;
        }
      }
    },
  },
});

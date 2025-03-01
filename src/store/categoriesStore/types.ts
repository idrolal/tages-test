export interface Material {
  id: string;
  name: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  code: null | string;
  price: {
    old_price: null | number;
    current_price: number;
  };
  image: {
    url: string;
  };
  material: number;
}

export interface CategoriesStoreScheme {
  categoryItems: CategoryItem[];
  materials: Material[];
  errorCategoryItems?: string;
  errorMaterials?: string;
}

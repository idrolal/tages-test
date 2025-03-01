import { RouterName } from '../routesName';

import { type RouteLocationNormalizedLoadedGeneric } from 'vue-router';

interface InterfaceMeta {
  breadcrumb: {
    name: RouterName;
    label: string | ((route: RouteLocationNormalizedLoadedGeneric) => string);
    params?: (route: RouteLocationNormalizedLoadedGeneric) => string;
  }[];
}
const initialState = [
  {
    name: RouterName.MAIN_PAGE,
    label: 'Главная',
  },
];

const naming = {
  storage_systems: 'Системы хранения',
  shelving_system_kits: 'Комплекты стеллажных систем',
};

const getParams = (
  route: RouteLocationNormalizedLoadedGeneric,
  keys: string[]
) => {
  return keys.reduce((acc, key) => {
    acc[key] = route.params[key];
    return acc;
  }, {});
};

const getLabel = (key: string) => {
  return naming[key as keyof typeof naming];
};

export const CATEGORIES = {
  path: '/:category',
  children: [
    {
      path: '',
      name: RouterName.CATEGORIES_PAGE,
      component: () => import('@/pages/CategoriesPage.vue'),
      meta: {
        breadcrumb: [
          ...initialState,
          {
            name: RouterName.CATEGORIES_PAGE,
            params: (route) => getParams(route, ['category']),
            // здесь можно сделать маппинг по i18n с переводами
            label: (route: RouteLocationNormalizedLoadedGeneric) =>
              getLabel(route.params.category as string),
          },
        ],
      } as InterfaceMeta,
    },
    {
      path: ':name',
      name: RouterName.CATEGORY_PAGE,
      component: () => import('@/pages/CategoryPage.vue'),
      meta: {
        breadcrumb: [
          ...initialState,
          {
            name: RouterName.CATEGORIES_PAGE,
            params: (route) => getParams(route, ['category']),
            label: (route) => getLabel(route.params.category as string),
          },
          {
            name: RouterName.CATEGORY_PAGE,
            params: (route) => getParams(route, ['name', 'category']),
            label: (route) => getLabel(route.params.name as string),
          },
        ],
      } as InterfaceMeta,
    },
  ],
};

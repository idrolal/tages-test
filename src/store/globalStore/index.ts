import { defineStore } from 'pinia';
import { type GlobalStoreScheme, ThemeName } from './types';

function initialTheme(): ThemeName {
  return (localStorage.getItem('theme') as ThemeName) || ThemeName.LIGHT;
}
export const useGlobalStore = defineStore('globalStore', {
  state: (): GlobalStoreScheme => ({
    theme: initialTheme(),
  }),
  actions: {
    setTheme(theme: ThemeName) {
      this.theme = theme;
      localStorage.setItem('theme', theme);
    },
  },
});

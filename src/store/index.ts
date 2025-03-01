import { createPinia } from 'pinia';
import { $api } from './fetchData';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$api = $api;
});

export { pinia };

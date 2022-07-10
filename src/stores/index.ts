export * from './board';

import { createPinia, type PiniaPluginContext } from 'pinia';

export const store = createPinia();

const subscribePlugin = (context: PiniaPluginContext) => {
  context.store.$subscribe(() => {
    localStorage.setItem(
      'vue-trello-clone',
      JSON.stringify(context.store.$state)
    );
  });
};

store.use(subscribePlugin);

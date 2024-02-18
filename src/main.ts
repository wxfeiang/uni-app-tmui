import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';
import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import tmui from './tmui';
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia.use(piniaPersist));
  app.use(tmui, { shareDisable: false } as Tmui.tmuiConfig);
  setupRouter(app);
  return {
    app,
  };
}

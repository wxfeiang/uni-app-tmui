import { createRouter } from 'uni-mini-router';
import { App } from 'vue';
import { createRouterGuard } from './guard';

declare const ROUTES: []; // 自定义的 类型

const router = createRouter({
  routes: [...ROUTES], // 路由表信息
});

export function setupRouter(app: App<Element>) {
  // Configure router guard
  createRouterGuard(router);

  app.use(router);
}
export default router;

import { createRouter, createWebHashHistory } from "vue-router"
// 1. 定义路由组件.
// 也可以从其他文件导入
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import GoodList from '~/pages/goods/list.vue'


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      {
        path: '/',
        component: Index,
        meta: { title: '后台首页' }
      },
      {
        path: "/goods/list",
        component: GoodList,
        meta: { title: '商品管理' }
      },
    ]
  },
  { path: "/login", component: Login, meta: { title: '登录页' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: '404页面' } },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router

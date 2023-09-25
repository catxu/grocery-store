import { createRouter, createWebHashHistory } from "vue-router"
// 1. 定义路由组件.
// 也可以从其他文件导入
import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import GoodList from '~/pages/goods/list.vue'
import UserList from '~/pages/user/list.vue'


// 默认路由
const routes = [
  {
    path: '/',
    component: Admin,
    name: 'admin'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '404页面'
    }
  },
];

// 动态路由，用于匹配菜单进行动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: Index,
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: GoodList,
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: UserList,
    meta: {
      title: '用户管理'
    }
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export function addRoutes(menus) {
  let hasNewRoute = false
  const findAndAddRouteByMenu = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path == e.path)
      if (item && !router.hasRoute(item.name)) {
        router.addRoute('admin', item)
        hasNewRoute = true
      }
      if (e.child && e.child.length > 0) {
        findAndAddRouteByMenu(e.child)
      }
    })
  }

  findAndAddRouteByMenu(menus)

  return hasNewRoute
}

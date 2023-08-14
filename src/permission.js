import router from "~/router";
import { getToken } from "~/composables/auth";
import { toast, showLoading, closeLoading } from "~/composables/utils";
import store from "./store";

router.beforeEach(async (to, from, next) => {
    // 开启全局loading
    showLoading()
    const token = getToken()
    if (!token && to.path != '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }
    if (token && to.path == '/login') {
        toast('请勿重复登录', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    // 如果用户已登录，自动获取用户信息
    if (token) {
        await store.dispatch('getUserInfo')
    }
    // 设置页面标题
    let title = to.meta.title 
    document.title = title

    next()

})

router.afterEach((to, from) => {
    // 关闭loading
    closeLoading()
});
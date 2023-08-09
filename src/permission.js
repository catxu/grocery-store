import router from "~/router";
import { getToken } from "~/composables/auth";
import { toast } from "~/composables/utils";
import store from "./store";

router.beforeEach(async (to, from, next) => {
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

    next()

})
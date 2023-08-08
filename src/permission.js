import router from "~/router";
import { getToken } from "~/composables/auth";
import { toast } from "~/composables/utils";

router.beforeEach((to, from, next) => {
    const token = getToken()
    if (!token && to.path != '/login') {
        toast('请先登录', 'error')
        return next({ path: '/login' })
    }
    if (token && to.path == '/login') {
        toast('请勿重复登录', 'error')
        return next({ path: from.path ? from.path : '/' })
    }

    next()

})
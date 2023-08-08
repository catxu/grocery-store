import { useCookies } from "@vueuse/integrations/useCookies";
const TOKEN_KEY = 'admin-token'
const cookie = useCookies()

// 设置 token
export function getToken() {
    return cookie.get(TOKEN_KEY)
}

// 获取 token
export function setToken(token) {
    return cookie.set(TOKEN_KEY, token)
}

// 清除 token
export function removeToken() {
    return cookie.remove(TOKEN_KEY)
}
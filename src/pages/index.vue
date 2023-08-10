<template>
    <el-button text @click="handleLogout">退出</el-button>
</template>
  
<script setup>
import { showModal, toast } from '~/composables/utils'
import { logout } from "~/api/user";
import store from '~/store';
import { useRouter } from "vue-router";

const router = useRouter()
function handleLogout() {
    showModal('是否退出登录？')
        .then(() => {
            logout()
                .finally(() => {
                    store.dispatch("logout").then(() => {
                        router.push('/login')
                        toast('退出登录成功')
                    })
                })
        })
        .catch(() => {
        })
}
</script>
  
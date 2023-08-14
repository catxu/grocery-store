<template>
    <div class="header">
        <span class="logo">
            <el-icon class="mr-2">
                <Promotion />
            </el-icon>
            The Namiya General Store
        </span>
        <el-icon class="icon-btn">
            <Fold />
        </el-icon>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
        <div class="flex items-center ml-auto">
            <el-tooltip content="全屏">
                <el-icon class="icon-btn" @click="toggleFullscreen">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center">
                    <el-avatar class="mr-1" :size="25"
                        src="https://www.tailwindcss.cn/_next/static/media/levelsio.a3935ad1.jpg" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { showModal, toast } from '~/composables/utils'
import { logout } from "~/api/user";
import store from '~/store';
import { useRouter } from "vue-router";
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen();

const toggleFullscreen = () => {
    toggle();
};

const handleRefresh = () => {
    location.reload()
}

const handleCommand = (command) => {
    switch (command) {
        case 'logout':
            handleLogout()
            break;
        default:
            break;
    }
}

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

<style scoped>
.header {
    @apply flex items-center bg-indigo-500 text-light-50 fixed left-0 top-0 right-0;
    height: 64px;
}

.logo {
    width: 300px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.header .dropdown {
    height: 64px;
    @apply flex justify-center items-center mx-5 text-light-50;
    cursor: pointer;
}
</style>
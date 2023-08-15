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

    <el-drawer v-model="showDrawer" :showClose="true" :close-on-click-modal="false">
        <h2 class="title">修改密码</h2>
        <div class="flex justify-center items-center">
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[260px]" @keyup.enter="onSubmit">
                <el-form-item prop="originPassword">
                    <el-input type="password" v-model="form.originPassword" placeholder="请输入原密码" show-password
                        autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input type="password" v-model="form.rePassword" placeholder="请确认新密码" show-password
                        autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round class="w-[260px] bg-indigo-500" type="primary" @click="onSubmit"
                        :loading="loading">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script setup>
import { showModal, toast } from '~/composables/utils'
import { logout, changePassword } from "~/api/user";
import store from '~/store';
import { useRouter } from "vue-router";
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
import FormDrawer from '~/components/FormDrawer.vue';

const showDrawer = ref(false)
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
            showDrawer.value = true
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

// do not use same name with ref
const form = reactive({
    originPassword: "",
    password: "",
    rePassword: ""
})

const validPassword = (rule, value, callback) => {
    if (value !== form.password) {
        callback(new Error("两次密码不一致，请检查后重新输入"));
    } else {
        callback();
    }
}

const rules = {
    originPassword: [
        {
            required: true,
            message: '原密码不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
        {
            min: 8,
            max: 12,
            message: '密码长度为 8 到 12 位',
            trigger: 'blur'
        }
    ],
    rePassword: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
        },
        {
            min: 8,
            max: 12,
            message: '密码长度为 8 到 12 位',
            trigger: 'blur'
        },
        {
            validator: validPassword,
            trigger: 'blur'
        }
    ]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        changePassword({ originPassword: form.originPassword, newPassword: form.password })
            .then(res => {
                toast('修改密码成功，请重新登录')
                store.dispatch("logout")
                router.push('/login')
            }).finally(() => {
                loading.value = false
            })
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

.title {
    @apply flex justify-center items-center font-bold text-2xl text-gray-800 mb-4;
}
</style>
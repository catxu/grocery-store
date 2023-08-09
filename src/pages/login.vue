<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>Welcome</div>
                <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum maiores id nemo sit numquam</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]" @keyup.enter="onSubmit">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登
                        录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import store from '~/store'
import { toast } from '~/composables/utils'
import { useRouter } from "vue-router";

// do not use same name with ref
const form = reactive({
    username: "",
    password: ""
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 10,
            message: '用户名长度为 3 到 10 位',
            trigger: 'blur'
        }

    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        },
    ]
}

const formRef = ref(null)
const router = useRouter()
const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        store.dispatch('login', form).then(res => {
            toast('登录成功')
            router.push('/')
        }).finally(() => {
            loading.value = false
        })
    })
}
</script>

<style scoped>
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-200 text-sm;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>
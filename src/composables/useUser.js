import { useRouter } from "vue-router";
import { ref, reactive } from 'vue'
import store from '~/store';
import { logout, changePassword } from "~/api/user";
import { showModal, toast } from '~/composables/utils'

// 修改密码
export function useRePassword() {
    const formDrawerRef = ref(null)
    const router = useRouter()

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
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            changePassword({ originPassword: form.originPassword, newPassword: form.password })
                .then(res => {
                    toast('修改密码成功，请重新登录')
                    store.dispatch("logout")
                    router.push('/login')
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open()


    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}


// 退出登录
export function useLogout() {
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

    return {
        handleLogout
    }
}
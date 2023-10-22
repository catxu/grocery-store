<template>
    <el-aside width="200px" class="i-aside" v-loading="loading">
        <div class="i-a-top">
            <ImageAsideList v-for="(item, index) in classes" :key="index" :active="activeId == item.id"
                @edit="handleEdit(item)" @delete="handleDelete(item.id)">
                {{ item.categoryName }}
            </ImageAsideList>
        </div>
        <div class="i-a-bottom">
            <el-pagination background layout="prev, next" :total="totalCount" @current-change="fetchImageClasses"
                :page-size="pageSize" :current-page="page" />
        </div>
    </el-aside>
    <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle + '分类'">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="form.order" :min="1" :max="100" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import ImageAsideList from './ImageAsideList.vue';
import FormDrawer from './FormDrawer.vue'
import { getImageClasses, createImageClass, updateImageClass, deleteImageClass } from '~/api/pics.js'
import { toast } from '~/composables/utils.js'

import { ref, reactive, computed } from 'vue'

const loading = ref(false)

const form = reactive({
    name: "",
    order: 50
})

const rules = {
    name: [
        {
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur'
        }
    ]
}

const formRef = ref(null)

const classes = ref([])
const activeId = ref(0)
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const formDrawerRef = ref(null)
const classId = ref(null)
const drawerTitle = computed(() => classId.value ? '修改' : '新增')

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        formDrawerRef.value.showLoading()
        let promise = classId.value ? updateImageClass(form) : createImageClass(form)

        promise.then(res => {
            toast(drawerTitle.value + '成功')
            fetchImageClasses(classId.value ? page.value : 1)
            formDrawerRef.value.close()
        }).finally(() => formDrawerRef.value.hideLoading())
    })
}

const handleEdit = (item) => {
    classId.value = item.id
    form.name = item.categoryName
    form.order = item.order
    formDrawerRef.value.open()
}

const handleDelete = (id) => {
    console.log(id);
    loading.value = true
    deleteImageClass(id)
        .then(res => {
            toast('删除成功')
            fetchImageClasses()
        })
        .finally(() => loading.value = false)
}

const openDrawer = () => {
    form.name = ""
    form.order = 50
    classId.value = null
    formDrawerRef.value.open()
}

function fetchImageClasses(currentPage) {
    if (currentPage) {
        page.value = currentPage
    }
    getImageClasses(page.value, pageSize.value).then(res => {
        classes.value = res.data
        totalCount.value = res.totalCount
        let activeItem = classes.value[0]
        if (activeItem) {
            activeId.value = activeItem.id
        }
    })
}

fetchImageClasses()
defineExpose({
    openDrawer
})
</script>

<style scoped>
.i-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.i-a-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.i-a-bottom {
    position: absolute;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>
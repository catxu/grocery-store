<template>
    <el-card shadow="never" class="border-0">
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>

            <el-tooltip content="刷新数据" placement="top">
                <el-button text @click="getNoticeData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="noticeData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="publishTime" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button size="small" type="primary" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="primary" text>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="fetchNoticeList"
                :page-size="pageSize" :current-page="page" />
        </div>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle + '公告'" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="default">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="请输入公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="请输入公告内容" type="textarea" :rows="5" />
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { toast } from '~/composables/utils.js'
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '~/api/notice.js'
import FormDrawer from '~/components/FormDrawer.vue'

const noticeData = ref([])

const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

function getNoticeData() {
    fetchNoticeList()
}

getNoticeData()

function fetchNoticeList(currentPage) {
    if (currentPage) {
        page.value = currentPage
    }
    loading.value = true
    getNoticeList(page.value, pageSize.value).then(res => {
        noticeData.value = res.data
        totalCount.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}

fetchNoticeList()

// 表单
// 如果存在activeId，则为编辑，否则为新增
const activeId = ref(null)
const drawerTitle = computed(() => activeId.value ? "修改" : "新增")
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    id: null,
    title: "",
    content: ""
})
const rules = {
    title: [{
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur'
    }],
    content: [{
        required: true,
        message: '公告内容不能为空',
        trigger: 'blur'
    }]
}
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        formDrawerRef.value.showLoading()
        form.id = activeId.value
        const promise = activeId.value ? updateNotice(form) : createNotice(form)
        promise.then(res => {
            toast(drawerTitle.value + '成功')
            fetchNoticeList(1)
            formDrawerRef.value.close()
        }).finally(() => {
            formDrawerRef.value.hideLoading()
        })
    })
}

const handleDelete = (id) => {
    loading.value = true
    deleteNotice(id).then(res => {
        fetchNoticeList(1)
    }).finally(() => {
        loading.value = false
    })
}

const handleCreate = () => {
    activeId.value = null
    resetForm({
        title: "",
        content: ""
    })
    formDrawerRef.value.open()
}

const handleEdit = (row) => {
    activeId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
}

function resetForm(row) {
    if (formRef.value) {
        formRef.value.clearValidate()
    }
    if (row) {
        for (const key in form) {
            form[key] = row[key]
        }
    }
}
</script>
<template>
    <el-card shadow="never" class="border-0">
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small">新增</el-button>

            <el-tooltip content="刷新数据" placement="top">
                <el-button text>
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="publishTime" label="发布时间" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button size="small" type="primary" text @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="primary" text>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getNoticeList } from '~/api/notice.js'

const tableData = ref([])

const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)


function getNoticeData() {
    tableData.value = [{
        "title": "标题",
        "publishTime": "2023-11-09 16:52:33",
        // "发布时间":"2023-11-09 16:52:33",
    }]
}

getNoticeData()

function fetchNoticeList(currentPage) {
    if (currentPage) {
        page.value = currentPage
    }
    loading.value = true
    getNoticeList(page.value, pageSize.value).then(res => {
        classes.value = res.data
        totalCount.value = res.totalCount
        let activeItem = classes.value[0]
        if (activeItem) {
            activeId.value = activeItem.id
        }
    }).finally(() => {
        loading.value = false
    })
}

fetchNoticeList()
</script>
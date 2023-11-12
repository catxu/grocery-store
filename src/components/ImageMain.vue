<template>
    <el-main class="i-main" v-loading="loading">
        <div class="i-m-top p-3">
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) in tableData" :key="index">
                    <el-card shadow="always" class="relative mb-3">
                        <el-image :src="item.url" fit="cover" class="w-full h-[150px]" :body-style="{ 'padding': 0 }"
                            :preview-src-list="[item.url]" :initial-index="0"></el-image>
                        <div class="image-name">{{ item.imageName }}</div>
                        <div class="items-center justify-center flex p-2">
                            <el-button type="primary" size="small" @click="handleEdit(item)" text>重命名</el-button>
                            <el-popconfirm title="是否要删除该图片？" confirmButtonText="确认" cancelButtonText="取消"
                                @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button text type="primary" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>

                </el-col>

            </el-row>

        </div>
        <div class="i-m-bottom">
            <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="fetchImageList"
                :page-size="pageSize" :current-page="page" />
        </div>
    </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { getImageList, updateImage, deleteImage } from '~/api/image'
import { showPrompt, toast } from '~/composables/util'

const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)
const tableData = ref([])
const imageClassId = ref(0)

function fetchImageList(currentPage) {
    if (currentPage) {
        page.value = currentPage
    }
    loading.value = true
    getImageList(page.value, pageSize.value, imageClassId.value).then(res => {
        tableData.value = res.data
        totalCount.value = res.totalCount
    }).finally(() => {
        loading.value = false
    })
}

const handleEdit = (item) => {
    showPrompt('重命名', item.imageName)
        .then(({ value }) => {
            loading.value = true
            updateImage(item.id, item.imageName)
                .then(res => {
                    toast('修改成功')
                    fetchImageList()
                }).finally(() => {
                    loading.value = false
                })
        })
}

const handleDelete = (id) => {
    loading.value = true
    deleteImage(id)
        .then(res => {
            toast('删除成功')
            fetchImageList()
        }).finally(() => loading.value = false)
}

fetchImageList()

// 根据分类id加载图片列表
const reloadingImageList = (classId) => {
    currentPage.value = 1
    imageClassId.value = classId
    fetchImageList()
}

defineExpose({
    reloadingImageList
})

</script>

<style scoped>
.i-main {
    position: relative;
}

.i-m-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.i-m-bottom {
    position: absolute;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}

.image-name {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
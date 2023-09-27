<template>
    <el-aside width="200px" class="i-aside">
        <div class="i-a-top">
            <ImageAsideList v-for="(item, index) in classes" :key="index" :active="activeId == item.id">
                {{ item.categoryName }}
            </ImageAsideList>
        </div>
        <div class="i-a-bottom">
            <el-pagination background layout="prev, next" :total="totalCount" @current-change="fetchImageClasses" :page-size="pageSize" :current-page="page" />
        </div>
    </el-aside>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ImageAsideList from './ImageAsideList.vue';
import { getImageClasses } from '~/api/pics.js'

const form = reactive({
    page: 1,
    pageSize: 10
})
const classes = ref([])
const activeId = ref(0)
const page = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

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
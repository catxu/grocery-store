<template>
    <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
        <el-header class="i-header">
            <el-button type="primary" size="small" @click="handleCategoryCreate">新增图片分类</el-button>
            
        </el-header>
        <el-container>
            <ImageAside ref="imageAsideRef" />
            <ImageMain />
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';

const windowHeight = window.innerHeight || document.body.clientHeight
// 减去 页面标题header、标签header、上下border size
const h = windowHeight - 64 - 44 - 40

const imageAsideRef = ref(null)

const handleCategoryCreate = () => imageAsideRef.value.openDrawer()
</script>

<style scoped>
.i-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}
</style>
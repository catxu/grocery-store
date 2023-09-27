<template>
    <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
        <el-header class="i-header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="i-aside">
                <div class="i-a-top">
                    <div v-for="i in 100" :key="i">{{ i }}</div>
                </div>
                <div class="i-a-bottom">
                    分页区域
                </div>
            </el-aside>
            <el-main class="i-main">
                <div class="i-m-top">
                    <div v-for="i in 100" :key="i">{{ i }}</div>
                </div>
                <div class="i-m-bottom">
                    分页区域
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight
// 减去 页面标题header、标签header、上下border size
const h = windowHeight - 64 - 44 - 40
</script>

<style scoped>
.i-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}

.i-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.i-main {
    position: relative;
}

.i-a-top,
.i-m-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.i-a-bottom,
.i-m-bottom {
    position: absolute;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>
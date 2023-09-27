<template>
    <el-main class="i-main">
        <div class="i-m-top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="i-m-bottom">
            分页区域
        </div>
    </el-main>
</template>

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
</style>
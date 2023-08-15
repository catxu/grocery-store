<template>
    <div>
        <el-drawer v-model="showDrawer" :showClose="true" :close-on-click-modal="false">
            <div class="formDrawer">
                <div class="body">
                    <slot></slot>
                </div>
                <div class="actions">
                    <el-button round type="default" @click="close">取消</el-button>
                    <el-button round class="bg-indigo-500" type="primary">提交</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)

const open = () => showDrawer.value = true

const close = () => showDrawer.value = false

defineExpose({
    open, close
})

</script>

<style>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    /* flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px; */
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>
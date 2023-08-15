<template>
    <div>
        <el-drawer v-model="showDrawer" :showClose="true" :close-on-click-modal="false">
            <div class="showDrawer">
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

<style scoped></style>
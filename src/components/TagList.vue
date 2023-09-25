<template>
    <div class="t-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" style="min-width: 100px;" @tab-remove="removeTab"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in tabs" :key="item.path" :closable="item.path != '/'" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handleCmd">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height: 44px;"></div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList.js'

const { activeTab, tabs, removeTab, changeTab, handleCmd } = useTabList()

</script>
  
<style scoped>
.t-tag-list {
    @apply fixed flex items-center bg-gray-100;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}

.tag-btn {
    @apply flex items-center justify-center bg-white ml-auto rounded px-2;
    height: 32px;
}

:deep(.el-tabs__header) {
    margin-bottom: 0;
    border-bottom: 0;
    height: 32px;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    @apply bg-white mx-1 rounded;
    line-height: 32px;
    height: 32px;
    border: 0 !important;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>
<template>
    <div class="t-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" style="min-width: 100px;" @tab-remove="removeTab"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in tabs" :key="item.path" :closable="item.path != '/'" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height: 44px;"></div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from "@vueuse/integrations/useCookies";
import { router } from '~/router';

const cookie = useCookies()
const route = useRoute()

const activeTab = ref(route.fullPath)
const tabs = ref([
    {
        title: '后台首页',
        path: '/'
    }
])

function initTabs() {
    const currentTabs = cookie.get('tabs')
    tabs.value = currentTabs
}

initTabs()

function addTab(tab) {
    const tabNotExist = tabs.value.findIndex(t => t.path == tab.path) == -1
    if (tabNotExist) {
        tabs.value.push(tab)
    }
    cookie.set('tabs', tabs.value)
}

const removeTab = (t) => {
    let currentTabs = tabs.value
    let active = activeTab.value
    if (active == t) {
        currentTabs.forEach((tab, index) => {
            if (tab.path == t) {
                const nextTab = currentTabs[index + 1] || currentTabs[index - 1]
                active = nextTab.path
            }
        })
    }
    activeTab.value = active
    tabs.value = currentTabs.filter(tab => tab.path != t)
    cookie.set('tabs', tabs.value)
}

const changeTab = (t) => {
    router.path(t)
    activeTab.value = t
}


onBeforeRouteUpdate((to, from) => {
    addTab({
        title: to.meta.title,
        path: to.fullPath
    })
    activeTab.value = to.fullPath
})

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
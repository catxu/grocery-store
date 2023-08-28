<template>
    <el-menu class="el-menu-vertical-demo " :style="width = $store.state.asideWidth" unique-opened
        :collapse-transition="false" :collapse="isCollapse" @select="handleSelect" :default-active="defaultActive">
        <template v-for="(item, index) in asideMenu" :key="index">
            <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="(subItem, subIndex) in item.child" :key="subIndex" :index="subItem.path">
                    <el-icon>
                        <component :is="subItem.icon"></component>
                    </el-icon>
                    <span>{{ subItem.name }}</span>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item v-else :index="item.path">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import store from '~/store'
import { computed, ref } from 'vue'

const router = useRouter()
const route = useRoute()
const defaultActive = ref(route.path)

const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

const handleSelect = (path) => {
    router.push(path)
}

const asideMenu = computed(() => store.state.menus)

</script>

<style scoped>
.el-menu-vertical-demo {
    top: 64px;
    bottom: 0;
    left: 0;
    overflow: auto;
    @apply shadow-md fixed border-0;
}
</style>
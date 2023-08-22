<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @select="handleSelect">
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
import { useRouter } from 'vue-router';

const router = useRouter()

const handleSelect=(path)=> {
    router.push(path)
}

const asideMenu = [{
    "name": "后台面板",
    "icon": "help",
    "child": [{
        "name": "主控台",
        "icon": "home-filled",
        "path": "/"
    }]
},
{
    "name": "商城管理",
    "icon": "shopping-bag",
    "child": [{
        "name": "商城管理",
        "icon": "shopping-cart-full",
        "path": "/goods/list"
    }]
}]

</script>

<style scoped>
.el-menu-vertical-demo {
    width: 250px;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow: auto;
    @apply shadow-md fixed border-0;
}
</style>
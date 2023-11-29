<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside :width="$store.state.asideWidth">
                    <Menu ref="menuRef" />
                </el-aside>
                <el-main>
                    <TagList ref="tabListRef" @tab-changed="handleTabChange" />
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import Header from "~/components/Header.vue";
import Menu from "~/components/Menu.vue";
import TagList from "~/components/TagList.vue";

const menuRef = ref(null);
const tabListRef = ref(null);

// 调用子组件方法，修改当前活跃菜单
const handleTabChange = path => {
    menuRef.value.changeActiveMenu(path);
};
</script>  
  
<style scoped>
.el-aside {
    transition: all 0.2s;
}

.fade-enter-to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.fade-enter-from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-active {
    transition-delay: 0.3s;
}
</style>
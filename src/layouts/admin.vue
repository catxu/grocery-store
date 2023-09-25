<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside :width="$store.state.asideWidth">
                    <Menu />
                </el-aside>
                <el-main>
                    <TagList />
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
import Header from '~/components/Header.vue';
import Menu from '~/components/Menu.vue';
import TagList from '~/components/TagList.vue';


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
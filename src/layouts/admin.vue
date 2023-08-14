<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside>
                    <Menu />
                </el-aside>
                <el-main>
                    <TagList />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import TagList from './components/TagList.vue';


</script>
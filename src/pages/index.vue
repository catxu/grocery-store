<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item, index) in statisticsInfos" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-500">
                                {{ item.title }}
                            </span>
                            <el-tag :type="item.type" class="mx-1" effect="dark">
                                {{ item.period }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-gray-500 font-bold text-3xl">
                        {{ item.value }}
                    </span>
                    <el-divider />
                    <div class="flex justify-between">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <IndexNav />

        <el-row :gutter="20" class="mt-5">
            <el-col :span="12" :offset="0">
                <IndexChart />
            </el-col>
            <el-col :span="12" :offset="0">
                <IndexCard title="待办事项" tips="TODOs" :items="todos"/>
            </el-col>
        </el-row>

    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { getStatisticsInfo, getTODOs } from '~/api/index.js';
import IndexNav from '~/components/IndexNav.vue'
import IndexChart from '~/components/IndexChart.vue'
import IndexCard from '~/components/IndexCard.vue'

const statisticsInfos = ref([])
getStatisticsInfo().then(res => {
    statisticsInfos.value = res
})

const todos = ref([])
getTODOs().then(res => {
    todos.value = res
})


</script>
  
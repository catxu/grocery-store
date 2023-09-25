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
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { getStatisticsInfo } from '~/api/index.js';
import IndexNav from '~/components/IndexNav.vue'

const statisticsInfos = ref([])
getStatisticsInfo().then(res => {
    statisticsInfos.value = res
})


</script>
  
<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">{{ title }}</span>
                <el-tag type="danger" effect="plain">
                    {{ tips }}
                </el-tag>
            </div>
        </template>
        <el-row :gutter="20">
            <el-col v-for="(item, index) in items" :key="index" :span="6" :offset="0">
                <el-card shadow="hover" :body-style="{ padding: '20px' }" class="border-0 bg-light-500">
                    <div class="flex flex-col items-center justify-center">
                        <span class="text-xl mb-2">{{ item.value }}</span>
                        <span class="text-sm">{{ item.content }}</span>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </el-card>
</template>

<script setup>
defineProps({
    title: String,
    tips: String,
    items: Array
})
</script>
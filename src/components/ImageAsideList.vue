<template>
    <el-aside width="200px" class="i-aside">
        <div class="aside-list" :class="{ 'active': active }">
            <span class="truncate">
                <slot />
            </span>
            <el-button class="ml-auto px-1" text type="primary" size="small" @click.stop="$emit('edit')">
                <el-icon :size="15">
                    <Edit />
                </el-icon>
            </el-button>
            <span @click.stop="() => { }">
                <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="$emit('delete')">
                    <template #reference>
                        <el-button class="px-1" text type="primary" size="small">
                            <el-icon :size="15">
                                <Delete />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
            </span>
        </div>
    </el-aside>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits(["edit", "delete"])
</script>

<style scoped>
.i-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>
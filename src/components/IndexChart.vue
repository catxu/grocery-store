<template>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, key) in options" :key="index" :checked="currentOption == item.value"
                        @click="handleClick(item.value)" style="margin-right: 8px">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <div ref="el" id="chart" style="height: 300px; width: 100%;">
        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from 'echarts';
import { getEChartStatistics } from '~/api/index.js'
import { useResizeObserver } from '@vueuse/core'

const currentOption = ref("week")

const options = [
    {
        text: "近1个月",
        value: "month"
    },
    {
        text: "近1周",
        value: "week"
    },
    {
        text: "近24小时",
        value: "hour"
    }
]

const handleClick = (type) => {
    currentOption.value = type
    fetchChartData()
}


var myChart = null
onMounted(() => {
    var chartDom = document.getElementById('chart');
    myChart = echarts.init(chartDom);
    fetchChartData()
})

function fetchChartData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading()
    getEChartStatistics(currentOption.value).then(res => {
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option);
    }).finally(() => {
        myChart.hideLoading()
    })
}

onBeforeUnmount(() => {
    if (myChart) {
        echarts.dispose(myChart)
    }
})

const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())
</script>
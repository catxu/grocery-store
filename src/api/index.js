import axios from "~/axios";

export function getStatisticsInfo() {
    return axios.get('/getStatisticsInfo')
}

export function getEChartStatistics(type) {
    return axios.post('/getEChartStatistics', {
        type
    })
}
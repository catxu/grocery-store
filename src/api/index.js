import axios from "~/axios";

export function getStatisticsInfo() {
    return axios.get('/getStatisticsInfo')
}

export function getEChartStatistics(type) {
    return axios.post('/getEChartStatistics', {
        type
    })
}

export function getTODOs() {
    return axios.get('/getTODOs')
}
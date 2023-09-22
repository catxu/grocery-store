import axios from "~/axios";

export function getStatisticsInfo() {
    return axios.get('/getStatisticsInfo')
}
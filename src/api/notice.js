import axios from "~/axios";

export function getNoticeList(page, pageSize) {
    return axios.post('/getNoticeList', {
        page,
        pageSize
    })
}

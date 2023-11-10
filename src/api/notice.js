import axios from "~/axios";

export function getNoticeList(page, pageSize) {
    return axios.post('/getNoticeList', {
        page,
        pageSize
    })
}

export function createNotice(form) {
    return axios.post('/createNotice', form)
}

export function updateNotice(form) {
    return axios.post('/updateNotice', form)
}

export function deleteNotice(id) {
    return axios.post('/deleteNotice', id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
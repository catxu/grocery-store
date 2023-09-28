import axios from "~/axios";

export function getImageClasses(page, pageSize) {
    return axios.post('/getImageClasses', {
        page,
        pageSize
    })
}

export function createImageClass(form) {
    return axios.post('/createImageClass', form)
}

export function updateImageClass(form) {
    return axios.post('/updateImageClass', form)
}
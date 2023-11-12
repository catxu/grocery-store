import axios from "~/axios";

export function getImageList(page, pageSize, imageClassId) {
    return axios.post('/getImageList', {
        page,
        pageSize,
        imageClassId
    })
}

export function updateImage(form) {
    return axios.post('/updateImage', form)
}

export function deleteImage(id) {
    return axios.post('/deleteImage', id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
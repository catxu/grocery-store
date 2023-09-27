import axios from "~/axios";

export function getImageClasses(page, pageSize) {
    return axios.post('/getImageClasses', {
        page,
        pageSize
    })
}

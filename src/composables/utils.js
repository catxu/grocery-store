import { ElNotification, ElMessageBox } from "element-plus";
import nProgress from "nprogress";

export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModal(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}

export function showPrompt(tip, value = '', title = '') {
    return ElMessageBox.prompt(tip, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}

export function showLoading() {
    nProgress.start()
}

export function closeLoading() {
    nProgress.done()
}
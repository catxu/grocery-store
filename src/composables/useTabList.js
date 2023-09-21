import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies';

export function useTabList() {
    const cookie = useCookies()
    const route = useRoute()
    const router = useRouter()

    const activeTab = ref(route.fullPath)
    const tabs = ref([
        {
            title: '后台首页',
            path: '/'
        }
    ])

    function initTabs() {
        let currentTabs = cookie.get('tabs')
        if (currentTabs) {
            tabs.value = currentTabs
        }
    }

    initTabs()

    function addTab(tab) {
        let tabNotExist = tabs.value.findIndex(t => t.path == tab.path) == -1
        if (tabNotExist) {
            tabs.value.push(tab)
        }
        cookie.set('tabs', tabs.value)
    }

    const removeTab = (t) => {
        let currentTabs = tabs.value
        let active = activeTab.value
        if (active == t) {
            currentTabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = currentTabs[index + 1] || currentTabs[index - 1]
                    active = nextTab.path
                }
            })
        }
        activeTab.value = active
        tabs.value = currentTabs.filter(tab => tab.path != t)
        cookie.set('tabs', tabs.value)
    }

    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }


    onBeforeRouteUpdate((to, from) => {
        addTab({
            title: to.meta.title,
            path: to.fullPath
        })
        activeTab.value = to.fullPath
    })

    function handleCmd(c) {
        if (c == 'closeAll') {
            activeTab.value = '/'
            tabs.value = tabs.value.filter(t => t.path == '/')
        } else {
            tabs.value = tabs.value.filter(t => t.path == '/' || t.path == activeTab.value)
        }
        cookie.set('tabs', tabs.value)
    }

    return {
        activeTab, tabs, removeTab, changeTab, handleCmd
    }
}
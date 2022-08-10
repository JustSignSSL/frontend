import config from "../../config.json"
import { useMainStore } from '../store/main'
import { ElMessage } from 'element-plus'
import { t } from './i18n'

export default async (data: any) => {
    let store = useMainStore()
    store.isLoading = true
    const res = await fetch(config.backend, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const data = await res.json()
        ElMessage({
            message: t('fetchSuccess'),
            type: "success"
        })
        store.isLoading = false
        store.certPem = data.data.certPem
        store.keyPem = data.data.keyPem
        store.powerCaCertPem = data.data.powerCaCertPem
    } else {
        store.isLoading = false
        if (res.status === 400) {
            ElMessage({
                message: t('paramIncorrect'),
                type: "warning"
            })
        } else if (res.status === 500) {
            ElMessage({
                message: t('serverError'),
                type: "error"
            })
        }
    }
}
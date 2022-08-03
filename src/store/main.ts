import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => {
        return {
            certPem: '',
            keyPem: '',
            powerCaCertPem: '',
            isLoading: false
        }
    },
})
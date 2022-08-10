<template>
    <el-tabs class="tabs" type="border-card">
        <el-tab-pane :label="$t('publicKey')">
            <el-skeleton class="skeleton" v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(certPem === '')">
                <Text :text="certPem"></text>
            </div>
            <el-empty class="empty" v-else :description="$t('noData')" />
        </el-tab-pane>
        <el-tab-pane :label="$t('privateKey')">
            <el-skeleton class="skeleton" v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(keyPem === '')">
                <Text :text="keyPem"></text>
            </div>
            <el-empty class="empty" v-else :description="$t('noData')" />
        </el-tab-pane>
        <el-tab-pane :label="$t('certificateChain')">
            <el-skeleton class="skeleton" v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(powerCaCertPem === '')">
                <Text :text="powerCaCertPem"></text>
            </div>
            <el-empty class="empty" v-else :description="$t('noData')" />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/main'
import Text from './text.vue'

const { certPem, keyPem, powerCaCertPem, isLoading } = storeToRefs(useMainStore())
</script>

<style scoped>
.tabs {
    margin-left: 0 auto;
    width: fit-content;
}

.skeleton,
.empty {
    width: 540px;
}
</style>
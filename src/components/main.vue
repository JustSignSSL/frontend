<template>
    <el-tabs class="tabs" type="border-card">
        <el-tab-pane label="证书">
            <el-skeleton v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(certPem === '')">
                <Text :text="certPem"></text>
            </div>
            <el-empty v-else description="没有数据" />
        </el-tab-pane>
        <el-tab-pane label="私钥">
            <el-skeleton v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(keyPem === '')">
                <Text :text="keyPem"></text>
            </div>
            <el-empty v-else description="没有数据" />
        </el-tab-pane>
        <el-tab-pane label="证书链">
            <el-skeleton v-if="isLoading" :rows="15" animated />
            <div class="cert" v-else-if="!(powerCaCertPem === '')">
                <Text :text="powerCaCertPem"></text>
            </div>
            <el-empty v-else description="没有数据" />
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
</style>
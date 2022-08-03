<template>
    <div class="select-all">
        <p v-for="line in lines"> {{ line }}</p>
    </div>
</template>
 
<script lang="ts" setup>
import { computed } from 'vue';

const { text } = defineProps(["text"])
const lines = computed(() => text.split("\n"))
</script>

<style scoped>
p {
    font-size: 14px;
    margin: 0 auto;
    font-family: 'Fira Code', monospace;
}

.select-all {
    user-select: all;
    margin: 0 auto;
    width: fit-content;
}
</style>
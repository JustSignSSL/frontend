<script setup lang="ts">
import Nav from './components/nav.vue';
import Main from './components/main.vue'
import { useI18n as _ } from 'vue-i18n';
</script>

<template>
  <div class="flex">
    <Nav class="nav"></Nav>
    <Main class="main"></Main>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}

.nav {
  width: 20%;
}

.main {
  margin-left: 40px;
  width: fit-content;
}
</style>

<script setup lang="ts">
import Nav from './components/nav.vue';
import Main from './components/main.vue'
import { footer } from './util/define';
</script>

<template>
  <div class="flex">
    <Nav class="nav"></Nav>
    <Main class="main"></Main>
  </div>
  <div class="footer" v-if="footer" v-html="footer"></div>
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

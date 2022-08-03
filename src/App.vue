<script setup lang="ts">
import Nav from './components/nav.vue';
import Main from './components/main.vue'
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
  width: 25%;
}

.main {
  margin-left: 40px;
  width: fit-content;
}
</style>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>

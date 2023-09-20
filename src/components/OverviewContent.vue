<template>
  <div class="w-full">
    <Topbar />
    <div
      class="flex justify-center items-center w-full h-screen text-lg font-bold"
    >
      INI PAGE OVERVIEW
    </div>
  </div>
</template>

<script>
import Topbar from "./Topbar.vue";

export default {
  name: "OverviewContent",
  components: { Topbar },
};
</script>

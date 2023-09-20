<script>
import { Icon } from "@iconify/vue";
export default {
  name: "Sidebar",
  components: {
    Icon,
  },
  data() {
    return {
      selectedMenu: null,
    };
  },
};
</script>

<template>
  <div class="w-[281px] h-screen border shadow-xl sticky top-0">
    <div class="px-9 pt-8 text-3xl font-extrabold">heylink.</div>
    <div class="px-10 pt-8">
      <router-link to="/">
        <div
          class="w-[229px] h-[46px] text-base font-medium flex items-center gap-2 rounded-lg pl-3"
          :class="{ 'bg-blue-100': selectedMenu === 'dashboard' }"
          @click="selectedMenu = 'dashboard'"
        >
          <div class="relative">
            <div class="flex items-center justify-center">
              <div>
                <Icon icon="akar-icons:home" class="text-2xl" />
              </div>
              <div class="absolute pt-1">
                <Icon icon="fluent-mdl2:market-down" class="text-xs" />
              </div>
            </div>
          </div>
          Dashboard
        </div>
      </router-link>
      <router-link to="/overview">
        <div
          class="w-[229px] h-[46px] text-base font-medium flex items-center gap-2 rounded-lg pl-3"
          :class="{ 'bg-blue-100': selectedMenu === 'overview' }"
          @click="selectedMenu = 'overview'"
        >
          <div class="relative">
            <div class="flex items-center justify-center">
              <div>
                <Icon icon="tabler:square" class="text-2xl" />
              </div>
              <div class="absolute">
                <Icon icon="fluent-mdl2:market" class="text-xs" />
              </div>
            </div>
          </div>
          Overview
        </div>
      </router-link>
      <router-link to="/dropdown">
        <div
          class="w-[229px] h-[46px] text-base font-medium flex items-center gap-2 rounded-lg pl-3"
          :class="{ 'bg-blue-100': selectedMenu === 'dropdown' }"
          @click="selectedMenu = 'dropdown'"
        >
          <div class="relative">
            <div class="flex items-center justify-center">
              <Icon icon="tdesign:component-dropdown" class="text-2xl" />
            </div>
          </div>
          Dropdown (No.2)
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: inherit;
  text-decoration: none;
}

.router-link-exact-active a {
  color: inherit;
  text-decoration: none;
}
</style>

<script>
import { Icon } from "@iconify/vue";
import * as dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
export default {
  name: "Modal",
  components: { Icon },
  props: {
    isModalOpen: Boolean,
    selectedUser: Object,
  },
  watch: {
    isModalOpen(newValue) {
      console.log("isModalOpen prop changed to:", newValue);
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isModalOpen", false);
    },
    formatDate(value) {
      return dayjs(value).format("DD / MM / YYYY");
    },
  },
};
</script>

<template>
  <transition name="fade" appear>
    <div
      class="fixed inset-0 z-40 backdrop-blur backdrop-brightness-50 backdrop-opacity-25"
      v-if="isModalOpen"
    >
      <div class="fixed inset-0 z-50 flex justify-center items-center">
        <div
          class="flex flex-col w-[555px] h-[436px] rounded-lg shadow-lg bg-white"
        >
          <div class="w-full flex justify-end pr-3 pt-3 text-3xl">
            <Icon
              icon="basil:cross-outline"
              @click="closeModal"
              class="cursor-pointer"
            />
          </div>
          <div class="p-5 flex gap-3">
            <div class="w-[150px] h-[150px]">
              <img
                class="rounded-full w-full h-full"
                :src="selectedUser.profile_picture"
              />
            </div>
            <div class="h-full flex flex-col justify-center">
              <div class="text-4xl font-medium">
                {{ selectedUser.first_name }} {{ selectedUser.last_name }}
              </div>
              <div class="text-xl font-medium">{{ selectedUser.email }}</div>
              <div class="text-xl font-medium">{{ selectedUser.phone }}</div>
            </div>
          </div>
          <div class="w-full h-full p-5">
            <div class="border h-full rounded p-3">
              <div class="flex text-sm font-semibold flex-col gap-2">
                <div class="flex gap-1">
                  <div class="w-[82px]">Date of Birth</div>
                  :
                  <div>{{ formatDate(selectedUser.date_of_birth) }}</div>
                </div>
                <div class="flex gap-1">
                  <div class="w-[82px]">Gender</div>
                  :
                  <div>
                    {{ selectedUser.gender }}
                  </div>
                </div>
                <div class="flex gap-1">
                  <div class="w-[82px]">Job</div>
                  :
                  <div>
                    {{ selectedUser.job }}
                  </div>
                </div>
                <div class="flex gap-1">
                  <div class="w-[82px]">Address</div>
                  :
                  <div>
                    {{ selectedUser.street }}, {{ selectedUser.state }},
                    {{ selectedUser.city }}, {{ selectedUser.country }},
                    {{ selectedUser.zipcode }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active-class {
  transition: opacity 1s; /* Menentukan durasi transisi menjadi 1 detik */
}
.fade-leave-active-class {
  transition: opacity 1s; /* Menentukan durasi transisi menjadi 1 detik */
}
.fade-enter-class {
  opacity: 0; /* Awalnya atur opacity menjadi 0 saat masuk atau keluar */
}
.fade-leave-class {
  opacity: 0; /* Awalnya atur opacity menjadi 0 saat masuk atau keluar */
}
</style>

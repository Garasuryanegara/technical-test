<script>
import Topbar from "./Topbar.vue";
import Modal from "./Modal.vue";
import { Icon } from "@iconify/vue";
import axios from "axios";
import * as dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
export default {
  name: "DashboardContent",
  components: { Topbar, Icon, Modal },
  data() {
    return {
      transactions: [
        {
          status: "pending",
          number: "2.480,30",
          percentage: "2.15",
          arrow: "up",
        },
        {
          status: "paid",
          number: "84.310",
          percentage: "1.10",
          arrow: "down",
        },
        {
          status: "rejected",
          number: "12.155",
          percentage: "2.15",
          arrow: "up",
        },
      ],
      users: [],
      selectedUser: null,
      isModalOpen: false,
    };
  },
  async mounted() {
    const response = await axios.get(
      "https://api.slingacademy.com/v1/sample-data/users"
    );
    this.users = response.data.users;
  },
  methods: {
    openModal(user) {
      this.selectedUser = user;
      this.isModalOpen = true;
      console.log(this.isModalOpen);
      console.log(this.selectedUser);
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedUser = null;
    },
    formatDate(value) {
      return dayjs(value).format("DD / MM / YYYY");
    },
    formatNumber(number) {
      const parts = number.split(",");
      console.log(parts);
      if (parts.length === 2) {
        return `${parts[0]},<span class="text-gray-500">${parts[1]}</span>`;
      } else {
        return number;
      }
    },
  },
};
</script>

<template>
  <div class="w-full">
    <Topbar />
    <Modal
      :selected-user="selectedUser"
      :is-modal-open="isModalOpen"
      @update:is-modal-open="isModalOpen = $event"
    />
    <div
      class="w-full py-5 px-9 flex flex-col gap-6"
      style="background-color: #f7f8fa"
    >
      <div class="flex justify-between">
        <div
          class="w-[347px] h-[143px] rounded-lg bg-white border-2 p-4 flex flex-col gap-5"
          v-for="(item, index) in transactions"
          :key="index"
        >
          <div class="flex justify-between">
            <div class="flex flex-col gap-1 pt-3">
              <div class="text-xs font-semibold">{{ item.status }}</div>
              <div class="text-xl font-semibold">
                <span v-html="formatNumber(item.number)"></span>
              </div>
            </div>
            <div
              class="w-9 h-9 rounded-md flex justify-center items-center text-gray-500 hover:cursor-pointer"
              style="background-color: #f2f4f7"
            >
              <div>
                <Icon icon="bi:square" class="text-2xl" />
              </div>
              <div class="absolute">
                <Icon icon="akar-icons:arrow-right-left" />
              </div>
            </div>
          </div>
          <div class="w-full h-full flex justify-between items-center text-xs">
            <div class="flex gap-0.5 items-center">
              <Icon
                v-if="item.arrow === 'up'"
                icon="ph:arrow-up-right"
                class="text-green-600 text-sm"
              />
              <Icon
                v-else-if="item.arrow === 'down'"
                icon="ph:arrow-down-right"
                class="text-red-600 text-sm"
              />
              <div v-if="item.arrow === 'up'" class="text-green-600">
                {{ item.percentage }}%
              </div>
              <div v-else-if="item.arrow === 'down'" class="text-red-600">
                {{ item.percentage }}%
              </div>
              <div class="text-gray-400 pl-1">Last Month</div>
            </div>
            <div class="text-gray-600 font-semibold">View More</div>
          </div>
        </div>
      </div>
      <div class="w-full rounded-lg border-2">
        <div class="text-lg font-semibold p-6">User List</div>
        <table class="table-auto w-full">
          <thead class="text-left">
            <tr class="text-gray-500 text-xs font-semibold h-[49px] border-t-2">
              <th class="text-center px-4">ID</th>
              <th>User</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Job</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody
            class="text-xs font-medium h-[49px] border-t-2"
            v-for="item in users"
            :key="item.id"
          >
            <tr>
              <td class="text-gray-500 text-center">{{ item.id }}</td>
              <td class="flex h-[49px] gap-2 items-center">
                <img
                  class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  :src="item.profile_picture"
                />
                <div>{{ item.first_name }} {{ item.last_name }}</div>
              </td>
              <td class="text-gray-500">
                {{ formatDate(item.date_of_birth) }}
              </td>
              <td>{{ item.email }}</td>
              <td class="text-gray-500">{{ item.job }}</td>
              <td>{{ item.country }}</td>
              <td>
                <button
                  class="w-[88px] h-[22px] rounded-sm shadow hover:border-none"
                  @click="openModal(item)"
                >
                  View Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

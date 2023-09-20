<template>
  <div class="w-full">
    <Topbar />
    <div
      class="flex flex-col items-center pt-16 w-full text-sm font-semibold gap-1"
    >
      <div class="flex w-full h-12 justify-center gap-5">
        <div
          class="w-[300px] h-full rounded-md bg-gray-300 border-2 border-gray-500 flex"
        >
          <div
            class="w-[250px] h-full flex items-center p-3"
            v-if="selectedProvince == null"
          >
            Pilih Provinsi
          </div>
          <div
            class="w-[250px] h-full flex items-center p-3"
            v-if="selectedProvince"
          >
            {{ selectedProvince }}
          </div>
          <div
            class="w-[50px] h-full flex justify-center items-center text-xl border-l-2 border-gray-500 hover:cursor-pointer hover:bg-gray-100 hover rounded-r-md"
            @click="isVisible1 = !isVisible1"
          >
            <Icon icon="icon-park:down" />
          </div>
        </div>
        <div
          class="w-[300px] h-full rounded-md bg-gray-300 border-2 border-gray-500 flex"
        >
          <div
            class="w-[250px] h-full flex items-center p-3"
            v-if="selectedCity == null"
          >
            Pilih Kota
          </div>
          <div
            class="w-[250px] h-full flex items-center p-3"
            v-if="selectedCity"
          >
            {{ selectedCity }}
          </div>

          <div
            class="w-[50px] h-full flex justify-center items-center text-xl border-l-2 border-gray-500 hover:cursor-pointer hover:bg-gray-100 hover rounded-r-md"
            @click="isVisible2 = !isVisible2"
          >
            <Icon icon="icon-park:down" />
          </div>
        </div>
      </div>

      <div class="flex w-[620px] gap-5">
        <div class="w-1/2">
          <div
            class="w-[300px] max-h-96 overflow-auto rounded-md bg-gray-100 border-2 border-gray-500 flex flex-col"
            v-if="isVisible1"
          >
            <div
              class="w-[296px] h-max flex justify-around items-center absolute p-2 gap-2 text-gray-600 bg-white rounded-t-md border-b-2 border-gray-300"
            >
              <div class="flex text-xs items-center gap-2">
                <div>name</div>
                <div>
                  <Icon
                    icon="icon-park-outline:up"
                    class="hover:text-black"
                    @click="sortProvince('name', 'asc')"
                  />
                  <Icon
                    icon="icon-park-outline:down"
                    class="hover:text-black"
                    @click="sortProvince('name', 'desc')"
                  />
                </div>
              </div>
              <div class="flex text-xs items-center gap-2">
                <div>ID</div>
                <div>
                  <Icon
                    icon="icon-park-outline:up"
                    class="hover:text-black"
                    @click="sortProvince('id', 'asc')"
                  />
                  <Icon
                    icon="icon-park-outline:down"
                    class="hover:text-black"
                    @click="sortProvince('id', 'desc')"
                  />
                </div>
              </div>
              <div class="hover:text-black text-xs" @click="reset()">Reset</div>
            </div>
            <div
              class="w-full h-full flex items-center px-3 pt-2 pb-2 border-b-2 border-gray-300 hover:cursor-pointer hover:bg-gray-300"
              :class="{ 'pt-12': index === 0 }"
              v-for="(province, index) in provinces"
              :key="province.id"
              @click="getProvince(province.name, province.id)"
            >
              {{ province.name }}
            </div>
          </div>
        </div>
        <div class="w-1/2">
          <div
            class="w-[300px] max-h-96 overflow-auto rounded-md bg-gray-100 border-2 border-gray-500 flex flex-col"
            v-if="isVisible2"
          >
            <div v-if="filteredCities.length === 0">
              <div
                class="w-full h-[38px] flex items-center px-3 py-2 border-b-2 border-gray-300 hover:cursor-pointer hover:bg-gray-300"
                v-for="city in cities"
                :key="city.id"
                @click="getCity(city.name, city.provinsi_id)"
              >
                {{ city.name }}
              </div>
            </div>
            <div v-else>
              <div
                class="w-full h-full flex items-center px-3 py-2 border-b-2 border-gray-300 hover:cursor-pointer hover:bg-gray-300"
                v-for="city in filteredCities"
                :key="city.id"
                @click="getCity(city.name, city.provinsi_id)"
              >
                {{ city.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "./Topbar.vue";
import { Icon } from "@iconify/vue";
import provinces from "../assets/js/province.js";
import cities from "../assets/js/city.js";
export default {
  name: "DropdownContent",
  components: { Topbar },
  data() {
    return {
      provinces: provinces,
      cities: cities,
      isVisible1: false,
      isVisible2: false,
      selectedProvince: null,
      selectedId: null,
      filteredCities: [],
      selectedCity: null,
    };
  },
  methods: {
    getProvince(name, id) {
      this.selectedProvince = name;
      this.selectedId = id;
      this.selectedCity = null;
      this.filteredCities = this.cities.filter(
        (city) => city.provinsi_id === id
      );
      this.isVisible1 = false;
    },
    getCity(name, id) {
      this.selectedCity = name;
      const provinceOfCity = this.provinces.filter((prov) => prov.id === id);
      this.selectedProvince = provinceOfCity[0].name;
      this.isVisible2 = false;
    },
    reset() {
      this.selectedCity = null;
      this.selectedId = null;
      this.selectedProvince = null;
      this.filteredCities = [];
    },
    sortProvince(key, order) {
      this.provinces.sort((a, b) => {
        if (key === "name") {
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (key === "id") {
          return order === "asc" ? a.id - b.id : b.id - a.id;
        }
      });
    },
  },
};
</script>

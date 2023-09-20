import { createRouter, createWebHistory } from "vue-router";
import DashboardContent from "../components/DashboardContent.vue";
import OverviewContent from "../components/OverviewContent.vue";
import DropdownContent from "../components/DropdownContent.vue";

const routes = [
  { path: "", component: DashboardContent },
  { path: "/overview", component: OverviewContent },
  { path: "/dropdown", component: DropdownContent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

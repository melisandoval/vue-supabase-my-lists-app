import { createRouter, createWebHistory } from "vue-router";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard.vue";
import Auth from "./pages/Auth/Auth.vue";

const routes = [
  { path: "/", name: "Home Dashboard", component: HomeDashboard },
  { path: "/auth", name: "Auth", component: Auth },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

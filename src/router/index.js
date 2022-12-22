import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard/Dashboard.vue";
import Auth from "../pages/Auth/Auth.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/auth", name: "Auth", component: Auth },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

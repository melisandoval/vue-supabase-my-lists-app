import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard/Dashboard.vue";
import LogIn from "./pages/LogIn/LogIn.vue";
import Register from "./pages/Register/Register.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/login", name: "Log in", component: LogIn },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

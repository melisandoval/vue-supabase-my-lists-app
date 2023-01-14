import { createRouter, createWebHistory } from "vue-router";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard.vue";
import LogIn from "./pages/LogIn/LogIn.vue";
import Register from "./pages/Register/Register.vue";
import RegistrationResponse from "./pages/RegistrationResponse/RegistrationResponse.vue";

const routes = [
  { path: "/", name: "Home Dashboard", component: HomeDashboard },
  { path: "/login", name: "Log in", component: LogIn },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

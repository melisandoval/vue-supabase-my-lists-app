import { createRouter, createWebHistory } from "vue-router";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard.vue";
import LogInPage from "./pages/LogIn/LogInPage.vue";
import RegisterPage from "./pages/Register/RegisterPage.vue";

const routes = [
  { path: "/", name: "Home Dashboard", component: HomeDashboard },
  { path: "/login", name: "LogIn Page", component: LogInPage },
  { path: "/register", name: "Register", component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

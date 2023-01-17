import { createRouter, createWebHistory } from "vue-router";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard.vue";
import LogInPage from "./pages/LogIn/LogInPage.vue";
import RegisterPage from "./pages/Register/RegisterPage.vue";
import ResetPasswordForm from "./pages/ResetPasswordForm/ResetPasswordForm.vue";
import UpdatePasswordForm from "./pages/UpdatePasswordForm/UpdatePasswordForm.vue";

const routes = [
  { path: "/", name: "Home Dashboard", component: HomeDashboard },
  { path: "/login", name: "LogIn Page", component: LogInPage },
  { path: "/register", name: "Register Page", component: RegisterPage },
  {
    path: "/reset-password",
    name: "Reset Password Form",
    component: ResetPasswordForm,
  },
  {
    path: "/update-password",
    name: "Update Password Form",
    component: UpdatePasswordForm,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;

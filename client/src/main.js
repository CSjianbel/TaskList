import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Toaster from "@meforma/vue-toaster";

import {
  TasksPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
} from "./views/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Tasks",
      component: TasksPage,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
});

createApp(App).use(router).use(Toaster).mount("#app");

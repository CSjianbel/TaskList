import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Toaster from "@meforma/vue-toaster";
import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  TasksPage,
  LoginPage,
  RegisterPage,
  NotFoundPage,
} from "./views/index.js";

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Tasks",
      component: TasksPage,
      meta: {
        requiresAuth: true,
      },
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    let isAuthenticated = false;
    try {
      const response = await axios.get("http://localhost:3000/auth/");

      if (response.status !== 200) {
        throw new Error("Failed to register for an account");
      }

      isAuthenticated = true;
    } catch (err) {
      isAuthenticated = false;
    }

    if (isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

library.add(faUserSecret);

createApp(App)
  .use(router)
  .use(Toaster)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
